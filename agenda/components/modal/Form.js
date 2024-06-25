import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import Input from "../shared/Input";
import DateTimePicker from "./DateTimePicker";
import { useState, useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import IsOnline from "./IsOnline";
import CustomBtn from "./CustomBtn";
import ErrorModal from "../shared/ErrorModal";
import {
  addEvent,
  removeEvent,
  updateEvent,
} from "../../store/slices/agendaSlice";

const initialState = {
  title: "",
  location: "",
  phoneNumber: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  isOnline: false,
};

const initialStateWithErrors = {
  title: {
    value: "",
    error: false,
  },
  location: {
    value: "",
    error: false,
  },
  phoneNumber: {
    value: "",
    error: false,
  },
  description: {
    value: "",
  },
  startDate: {
    value: new Date(),
  },
  endDate: {
    value: new Date(),
    error: false,
  },
  isOnline: {
    value: false,
  },
};

export default function Form({ isFormVisible, closeForm, selectedEvent }) {
  const closeKeyboardHandler = () => Keyboard.dismiss();
  const event = useSelector((state) =>
    state.agenda.events.find((event) => event.id === selectedEvent)
  );
  const [formData, setFormData] = useState(initialStateWithErrors);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const dispatch = useDispatch();
  const closeErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const onFormChange = (key, value) => {
    setFormData((previous) => {
      return {
        ...previous,
        [key]: {
          value,
          error: false,
        },
      };
    });
  };

  const formErrorsHandler = (key) => {
    setFormData((previous) => {
      return {
        ...previous,
        [key]: {
          ...previous[key],
          error: true,
        },
      };
    });
  };

  const isUrlValid = (string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  const onSubmit = () => {
    const data = {
      title: formData.title.value,
      location: formData.location.value,
      phoneNumber: formData.phoneNumber.value,
      description: formData.description.value,
      startDate: new Date(formData.startDate.value).toUTCString(),
      endDate: new Date(formData.endDate.value).toUTCString(),
      isOnline: formData.isOnline.value,
    };
    if (event?.id) {
      data.id = event.id;
      dispatch(updateEvent(data));
    } else {
      data.id = Date.now().toString();
      dispatch(addEvent(data));
    }
    closeForm();
    setFormData(initialStateWithErrors);
  };

  const removeEvt = () => {
    if (event) {
      dispatch(removeEvent({ id: event.id }));
    }
    closeFormHandler();
  };

  const closeFormHandler = () => {
    closeForm();
    setFormData(initialStateWithErrors);
  };

  const validateBeforeSubmit = () => {
    const messages = [];
    if (!formData.title.value?.trim().length) {
      formErrorsHandler("title");
      messages.push("Le titre est obligatoire");
    }
    if (formData.isOnline.value && !isUrlValid(formData.location?.value)) {
      formErrorsHandler("location");
      messages.push("L'url est invalide");
    }
    if (
      formData.phoneNumber.value?.length &&
      formData.phoneNumber.value.length !== 10 &&
      isNaN(+formData.phoneNumber.value)
    ) {
      messages.push("Le numéro de téléphone est invalide");
      formErrorsHandler("phoneNumber");
    }
    if (formData.endDate.value < formData.startDate.value) {
      formErrorsHandler("endDate");
      messages.push("La fin de l'événement doit être après le début");
    }
    if (messages.length) {
      setIsErrorModalVisible(true);
      setErrorMessages(messages);
    } else {
      onSubmit();
    }
  };

  useEffect(() => {
    let initialState = {};
    if (event) {
      Object.keys(event).map((key) => {
        initialState[key] = {
          value: event[key],
          error: false,
        };
      });
      setFormData(initialState);
    }
  }, [event]);

  return (
    <Modal
      visible={isFormVisible}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <Pressable style={styles.formContainer} onPress={closeKeyboardHandler}>
        <View style={styles.headerContainer}>
          <Text style={styles.formTitle}>Nouvel événement</Text>
          <Feather
            name="trash-2"
            size={28}
            color={colors.LIGHT}
            onPress={removeEvt}
            suppressHighlighting={true}
          />
        </View>
        <Input
          label="Titre"
          autoCorrect={false}
          maxLength={40}
          value={formData.title.value}
          onChangeText={onFormChange.bind(this, "title")}
          error={formData.title.error}
        />
        <Input
          label={formData.isOnline.value ? "Url" : "Lieu"}
          inputMode={formData.isOnline.value ? "url" : "text"}
          autoCorrect={false}
          maxLength={40}
          value={formData.location.value}
          onChangeText={onFormChange.bind(this, "location")}
          error={formData.location.error}
        />
        <Input
          label="Téléphone"
          inputMode="tel"
          maxLength={10}
          value={formData.phoneNumber.value}
          onChangeText={onFormChange.bind(this, "phoneNumber")}
          error={formData.phoneNumber.error}
        />
        <Input
          label="Description"
          multiline
          maxLength={120}
          value={formData.description.value}
          onChangeText={onFormChange.bind(this, "description")}
        />
        <DateTimePicker
          label="Début"
          dateTime={formData.startDate.value}
          setDateTime={onFormChange.bind(this, "startDate")}
        />
        <DateTimePicker
          label="Fin"
          dateTime={formData.endDate.value}
          setDateTime={onFormChange.bind(this, "endDate")}
          error={formData.endDate.error}
        />
        <IsOnline
          isEnabled={formData.isOnline.value}
          setIsEnabled={onFormChange.bind(this, "isOnline")}
        />
        <View style={styles.btnContainer}>
          <CustomBtn
            text="Annuler"
            color={colors.PINK}
            onPress={closeFormHandler}
          />
          <CustomBtn
            text="Valider"
            color={colors.VIOLET}
            onPress={validateBeforeSubmit}
          />
        </View>
      </Pressable>
      <ErrorModal
        isModalVisible={isErrorModalVisible}
        closeModal={closeErrorModal}
        errors={errorMessages}
      />
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
