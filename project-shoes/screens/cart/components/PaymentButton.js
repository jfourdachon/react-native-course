import { useEffect, useState } from "react";
import CustomButton from "../../../ui-components/buttons/CustomButton";
import { useInitPaymentMutation } from "../../../store/api/stripe";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

export default function PaymentButton({ isReady, setIsPaymentDone }) {
  const [clientSecret, setClientSecret] = useState();
  const [initPayment] = useInitPaymentMutation();

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }

    const { error } = await presentPaymentSheet();
    if (error) {
      console.log(error);
    } else {
      setIsPaymentDone(true);
    }
  };

  const initialisePaymentSheet = async () => {
    const { data } = await initPayment();
    const { error } = await initPaymentSheet({
      customerId: data.customer,
      customerEphemeralKeySecret: data.ephemeralKey,
      paymentIntentClientSecret: data.paymentIntent,
      merchantDisplayName: "Shoes Inc.",
      returnURL: "exp://127.0.0.1:8081",
    });
    if (!error) {
      setClientSecret(data.paymentIntent);
    }
  };
  useEffect(() => {
    if (isReady) {
      initialisePaymentSheet();
    }
  }, [isReady]);
  return (
    <CustomButton
      text="Passer la commande"
      isLoading={!isReady}
      onPress={openPaymentSheet}
    />
  );
}
