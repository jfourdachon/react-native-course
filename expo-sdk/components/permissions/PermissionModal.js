import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function PermissionsModal({
  permissions,
  closeModal,
  isVisible,
  openSettings,
}) {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>
          L'applicatoin a vesoin d'accéder à vos paramètres
        </Text>
        <View>
          {permissions?.map((permission, index) => (
            <Text key={index} style={styles.permissionText}>
              {permission}
            </Text>
          ))}
        </View>
        <View style={styles.btnContainer}>
          <Pressable
            onPress={closeModal}
            style={[styles.btn, styles.cancelBtn]}
          >
            <Text style={styles.btnText}>Annuler</Text>
          </Pressable>
          <Pressable onPress={openSettings} style={[styles.btn, styles.okBtn]}>
            <Text style={styles.btnText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: 360,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#fff",
    padding: 24,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "600",
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 60,
    width: "100%",
  },
  btn: {
    height: "100%",
    width: 120,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  okBtn: {
    backgroundColor: "black",
  },
  cancelBtn: {
    backgroundColor: "grey",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
});
