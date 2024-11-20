import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import Input from "../shared/Input";
import DateTimePicker from "./DateTimePicker";
import { useEffect } from "react";
import IsOnline from "./IsOnline";
import CustomBtn from "./CustomBtn";
import ErrorModal from "../shared/ErrorModal";
import { Formik } from "formik";
import * as Yup from "yup";
import LoadingOverlay from "../overlay/LoadingOverlay";
import ErrorOverlay from "../overlay/ErrorOverlay";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetAllEventsQuery,
  useUpdateEventMutation,
} from "../../store/api/agendaApi";
import { useSelector } from "react-redux";

export default function FormWithFormik({
  isFormVisible,
  closeForm,
  selectedEvent,
}) {
  /**
   * AXIOS and Redux slice
   */
  // const event = useSelector((state) =>
  //   state.agenda.events.find((event) => event.id === selectedEvent)
  // );
  // const [isLoading, setIsLoading] = useState(false);
  // const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  // const [httpError, setHttpError] = useState(false);
  // const dispatch = useDispatch();

  // const httpEventHandler = async (data, httpFn, reducer, setLoadingState) => {
  //   setLoadingState(true);
  //   try {
  //     const newEventId = await httpFn(data);
  //     if (!data.id) {
  //       data.id = newEventId;
  //     }
  //     dispatch(reducer(data));
  //     setLoadingState(false);
  //     closeForm();
  //   } catch (error) {
  //     setLoadingState(false);
  //     setHttpError(true);
  //     setTimeout(() => {
  //       closeForm();
  //       setHttpError(false);
  //     }, 4000);
  //   }
  // };

  const token = useSelector((state) => state.auth.idToken);
  const closeKeyboardHandler = () => Keyboard.dismiss();
  const { data: event, error } = useGetAllEventsQuery(token, {
    skip: !selectedEvent,
    selectFromResult: ({ data, error }) => ({
      data: data?.find((item) => item.id === selectedEvent),
    }),
  });
  const [
    createEvent,
    { isLoading: isCreating, error: createError, isSuccess: isCreated },
  ] = useCreateEventMutation();

  const [
    updateEvent,
    { isLoading: isUpdating, error: updateError, isSuccess: isUpdated },
  ] = useUpdateEventMutation();

  const [
    deleteEvent,
    { isLoading: isDeleting, error: deleteError, isSuccess: isDeleted },
  ] = useDeleteEventMutation();

  const initialState = event
    ? event
    : {
        title: "",
        location: "",
        phoneNumber: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        isOnline: false,
      };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Le titre est obligatoire"),
    location: Yup.string().when("isOnline", {
      is: true,
      then: (schema) => schema.url("L'url est invalide").notRequired(),
      otherwise: (schema) => schema.notRequired(),
    }),
    phoneNumber: Yup.string().matches(/^[0-9]\d{9}$/, {
      message: "Le numéro de téléphone est invalide",
    }),
    startDate: Yup.date(),
    endDate: Yup.date().min(
      Yup.ref("startDate"),
      "La fin d l'événement doit être après le début"
    ),
    isOnline: Yup.boolean(),
  });

  const onSubmit = async (values) => {
    const data = {
      title: values.title,
      location: values.location,
      phoneNumber: values.phoneNumber,
      description: values.description,
      startDate: new Date(values.startDate).toUTCString(),
      endDate: new Date(values.endDate).toUTCString(),
      isOnline: values.isOnline,
    };
    if (event?.id) {
      updateEvent({ id: event.id, event: data, token });
    } else {
      createEvent({ event: data, token });
    }
  };

  const removeEvt = () => {
    if (event) {
      deleteEvent({ id: event.id, token });
    } else {
      closeForm();
    }
  };

  useEffect(() => {
    if (isCreated || isUpdated || isDeleted) {
      closeForm();
    }
  }, [isCreated, isUpdated, isDeleted]);

  return (
    <Modal
      visible={isFormVisible}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <Pressable style={styles.formContainer} onPress={closeKeyboardHandler}>
        <View style={styles.headerContainer}>
          <Text style={styles.formTitle}>
            {selectedEvent ? "Modifier l'événement" : "Nouvel énénement"}
          </Text>
          {isDeleting ? (
            <ActivityIndicator color={colors.LIGHT} size="small" />
          ) : (
            <Feather
              name="trash-2"
              size={28}
              color={colors.LIGHT}
              onPress={removeEvt}
              suppressHighlighting={true}
            />
          )}
        </View>
        <Formik
          initialValues={initialState}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
            errors,
            touched,
            status,
            setStatus,
            isSubmitting,
          }) => {
            if (
              isSubmitting &&
              status !== "error" &&
              (!values.title || Object.keys(errors).length)
            ) {
              setStatus("error");
            }
            return (
              <>
                <Input
                  label="Titre"
                  autoCorrect={false}
                  maxLength={40}
                  value={values.title}
                  onChangeText={handleChange("title")}
                  error={errors.title && touched.title}
                />
                <Input
                  label={values.isOnline ? "Url" : "Lieu"}
                  inputMode={values.isOnline ? "url" : "text"}
                  autoCorrect={false}
                  maxLength={40}
                  value={values.location}
                  onChangeText={handleChange("location")}
                  error={errors.location && touched.location}
                />
                <Input
                  label="Téléphone"
                  inputMode="tel"
                  maxLength={10}
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  error={errors.phoneNumber && touched.phoneNumber}
                />
                <Input
                  label="Description"
                  multiline
                  maxLength={120}
                  value={values.description}
                  onChangeText={handleChange("description")}
                />
                <DateTimePicker
                  label="Début"
                  dateTime={values.startDate}
                  setDateTime={(date) => setFieldValue("startDate", date)}
                />
                <DateTimePicker
                  label="Fin"
                  dateTime={values.endDate}
                  setDateTime={(date) => setFieldValue("endDate", date)}
                  error={errors.endDate}
                />
                <IsOnline
                  isEnabled={values.isOnline}
                  setIsEnabled={(value) => setFieldValue("isOnline", value)}
                />
                <View style={styles.btnContainer}>
                  <CustomBtn
                    text="Annuler"
                    color={colors.PINK}
                    onPress={closeForm}
                  />
                  <CustomBtn
                    text="Valider"
                    color={colors.VIOLET}
                    onPress={handleSubmit}
                    isLoading={isCreating || isUpdating}
                  />
                </View>
                <ErrorModal
                  isModalVisible={status === "error"}
                  closeModal={setStatus}
                  errors={errors}
                />
                {isCreating || isUpdating || isDeleting ? (
                  <LoadingOverlay />
                ) : null}
                {createError || updateError || deleteError ? (
                  <ErrorOverlay />
                ) : null}
              </>
            );
          }}
        </Formik>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.DARK,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.VIOLET,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
