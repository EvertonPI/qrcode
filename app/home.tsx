import { CameraView, useCameraPermissions } from "expo-camera";

import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const [hasCameraPermission, requestCameraPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const useLockQrCode = useRef(false);

  async function handleOpenCamera() {
    const { granted } = await requestCameraPermission();

    if (!granted) {
      alert("Permissão de câmera negada");
      return;
    }
    try {
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleQrCodeScanned = (data: string) => {
    setModalVisible(false);
    Alert.alert("QRCode", data);
    useLockQrCode.current = false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grupo Figueiredo</Text>
      <Text style={styles.mission}>
        Transporte rodoviário de produtos siderúrgicos com segurança, qualidade
        e pontualidade.
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleOpenCamera}
      >
        <Text style={styles.buttonText}>Ler QRCode</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !useLockQrCode.current) {
              useLockQrCode.current = true;
              setTimeout(() => handleQrCodeScanned(data), 500);
            }
          }}
        />

        <View style={styles.footer}>
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mission: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
  },
});
export default Home;
