import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  scrollImage,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  data,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { getFirestore, collection, getDocs,addDoc, deleteDoc, doc , getDoc,  updateDoc} from "firebase/firestore";
import appFirebase from "./credenciales";
import { FontAwesome } from "@expo/vector-icons";

function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const validarusuario = "Oscar";
    const validarcontrasena = "12345";

    if (usuario === validarusuario && contrasena === validarcontrasena) {
      navigation.navigate("MainApp");
    } else {
      setError("Datos incorrectos, intentalo de nuevo");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text style={styles.title}>Administrativo</Text>
      <Image
        style={styles.heroImage}
        source={{
          uri: "https://apmc.cat/apmc/wp-content/uploads/2020/03/1366_2000-1.jpg",
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="black"
        value={usuario}
        onChangeText={(text) => setUsuario(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="black"
        secureTextEntry
        value={contrasena}
        onChangeText={(text) => setcontrasena(text)}
      />
      {error !== "" && <Text style={styles.errorTexto}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Vehiculos registrados")}
        >
          <Text style={styles.topBarLink}>Vehiculos registrados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
          <Text style={styles.topBarLink}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Historial_Servicios")}
        >
          <Text style={styles.topBarLink}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
          <Text style={styles.topBarLink}>Reportes</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}> </Text>
      <Text style={styles.title}>Agencia grupo Volkswagen</Text>
      <Text style={styles.title}> Das Auto </Text>
      <Text style={styles.subtitle}>Administrativo</Text>
      <Image
        style={styles.heroImage}
        source={{
          uri: "https://images.squarespace-cdn.com/content/v1/616c6ad69eeab863bd63af80/7872d891-0426-4ead-95c7-03e3c3dc794f/Volkwagen-GIF-5.gif",
        }}
      />
      <View style={styles.downBar}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.facebook.com/VolkswagenMX")
            }
          >
            <Text style={styles.topBarTexto}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")
            }
          >
            <Text style={styles.topBarTexto}>Ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tel1}>
            <Text style={styles.topBarTexto}>Soporte ✆</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
        <Text style={styles.topBarTexto}>
          © Volkswagen 2025 todos los derechos reservados
        </Text>
              
      </View>
    </View>
  );
}

function VentasScreen() {
  const db = getFirestore(appFirebase);
  const [modelosDisponibles, setModelosDisponibles] = useState([]);
  const [modelosNoDisponibles, setModelosNoDisponibles] = useState([]);
  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };
  
  const cargarModelos = async () => {
    try {
      const consultaDisponibles = await getDocs(collection(db, "VentasDisponibles"));
      const valoresDisponibles = consultaDisponibles.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModelosDisponibles(valoresDisponibles);

      const consultaNoDisponibles = await getDocs(collection(db, "VentasNoDisponibles"));
      const valoresNoDisponibles = consultaNoDisponibles.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModelosNoDisponibles(valoresNoDisponibles);
    } catch (error) {
      console.error("Error al obtener documentos:", error.message);
    }
  };

  useEffect(() => {
    cargarModelos();
  }, []);
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Vehiculos registrados")}>
            <Text style={styles.topBarLink}>Vehiculos registrados</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
            <Text style={styles.topBarLink}>Citas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Historial citas")}>
            <Text style={styles.topBarLink}>Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
            <Text style={styles.topBarLink}>Reportes</Text>
          </TouchableOpacity>
        </View>
        <Text>   </Text>
        <Text>   </Text>
        <Text>   </Text>
        <Text style={styles.title}>Modelos en venta disponibles</Text>
        <View style={styles.carModels}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalContent}
          >
            {modelosDisponibles.map((modelo) => (
              <View key={modelo.id} style={styles.itemContainer}>
                <Image
                  source={{ uri: modelo.Imagen }} 
                  style={styles.scrollImage}
                />
                <Text style={styles.title}>{modelo.Marca} {modelo.Modelo}</Text> 
                <Text style={styles.price}>${modelo.Precio}</Text> 
                <Text style={styles.year}>{modelo.Año}</Text> 
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.title}>Modelos en venta no disponibles</Text>
        <View style={styles.carModels}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalContent}
          >
            {modelosNoDisponibles.map((modelo) => (
              <View key={modelo.id} style={styles.itemContainer}>
                <Image
                  source={{ uri: modelo.Imagen }} 
                  style={styles.scrollImage}
                />
                <Text style={styles.title}>{modelo.Marca} {modelo.Modelo}</Text> 
                <Text style={styles.price}>${modelo.Precio}</Text> 
                <Text style={styles.year}>{modelo.Año}</Text> 
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      
      <View style={styles.downBar}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/VolkswagenMX")}>
            <Text style={styles.topBarTexto}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")}>
            <Text style={styles.topBarTexto}>Ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tel1}>
            <Text style={styles.topBarTexto}>Soporte ✆</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
        <Text style={styles.topBarTexto}>© Volkswagen 2025 todos los derechos reservados</Text>
      </View>
    </ScrollView>
  );
}

function RentasScreen() {
  const db = getFirestore(appFirebase);
  const [modelosDisponibles, setModelosDisponibles] = useState([]);
  const [modelosNoDisponibles, setModelosNoDisponibles] = useState([]);
  
  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };

  const cargarModelos = async () => {
    try {
    
      const consultaDisponibles = await getDocs(collection(db, "RentasDisponibles"));
      const valoresDisponibles = consultaDisponibles.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModelosDisponibles(valoresDisponibles);

    
      const consultaNoDisponibles = await getDocs(collection(db, "RentasNoDisponibles"));
      const valoresNoDisponibles = consultaNoDisponibles.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModelosNoDisponibles(valoresNoDisponibles);
    } catch (error) {
      console.error("Error al obtener documentos:", error.message);
    }
  };

  useEffect(() => {
    cargarModelos();
  }, []);
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Vehiculos registrados")}>
            <Text style={styles.topBarLink}>Vehiculos registrados</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
            <Text style={styles.topBarLink}>Citas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Historial citas")}>
            <Text style={styles.topBarLink}>Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
            <Text style={styles.topBarLink}>Reportes</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title}>Modelos en renta disponibles</Text>
        <View style={styles.carModels}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalContent}
          >
            {modelosDisponibles.map((modelo) => (
              <View key={modelo.id} style={styles.itemContainer}>
                <Image
                  source={{ uri: modelo.Imagen }} 
                  style={styles.scrollImage}
                />
                <Text style={styles.title}>{modelo.Marca} {modelo.Modelo}</Text> 
                <Text style={styles.price}>${modelo.Renta} Mensuales</Text> 
                <Text style={styles.year}>{modelo.Año}</Text> 
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.title}>Modelos en renta no disponibles</Text>
        <View style={styles.carModels}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalContent}
          >
            {modelosNoDisponibles.map((modelo) => (
              <View key={modelo.id} style={styles.itemContainer}>
                <Image
                  source={{ uri: modelo.Imagen }} 
                  style={styles.scrollImage}
                />
                <Text style={styles.title}>{modelo.Marca} {modelo.Modelo}</Text> 
                <Text style={styles.price}>${modelo.Renta} Mensuales</Text> 
                <Text style={styles.year}>{modelo.Año}</Text> 
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      
      <View style={styles.downBar}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/VolkswagenMX")}>
            <Text style={styles.topBarTexto}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")}>
            <Text style={styles.topBarTexto}>Ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tel1}>
            <Text style={styles.topBarTexto}>Soporte ✆</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
        <Text style={styles.topBarTexto}>© Volkswagen 2025 todos los derechos reservados</Text>
      </View>
    </ScrollView>
  );
}


function CitasScreen() {
  const db = getFirestore();  
  const [citas, setCitas] = useState([]);  

  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };

  
  const cargarCitas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "CitasServicios"));
      const citasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCitas(citasData);
    } catch (error) {
      console.error("Error al obtener las citas: ", error.message);
    }
  };

  useEffect(() => {
    cargarCitas();  
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Vehiculos registrados")}>
          <Text style={styles.topBarLink}>Vehiculos registrados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
          <Text style={styles.topBarLink}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Historial citas")}>
          <Text style={styles.topBarLink}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
          <Text style={styles.topBarLink}>Reportes</Text>
        </TouchableOpacity>
      </View>
      <Text>     </Text>
      <Text>     </Text>
      <Text style={styles.title}>Cita de Servicios</Text>
      <ScrollView>
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Image
                source={{ uri: item.Imagen }} 
                style={styles.imageExtended}
              />
              <View style={styles.infoContainerExtended}>
                <Text style={styles.text}>
                  <Text style={styles.label}>Propietario:</Text> {item.Propietario}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Vehículo:</Text> {item.Vehiculo}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Servicio:</Text> {item.Servicio}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Placas:</Text> {item.Placas}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Fecha:</Text> {item.Fecha}
                </Text>
              </View>
            </View>
          )}
        />
        
        <View style={styles.downBar}>
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/VolkswagenMX")}>
              <Text style={styles.topBarTexto}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")}>
              <Text style={styles.topBarTexto}>Ubicación</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={tel1}>
              <Text style={styles.topBarTexto}>Soporte ✆</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
          <Text style={styles.topBarTexto}>© Volkswagen 2025 todos los derechos reservados</Text>
        </View>
      </ScrollView>
    </View>
  );
}


function CalificarApp() {
  const db = getFirestore();
  const [calificaciones, setCalificaciones] = useState([]); 

  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };


  const cargarCalificaciones = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Rating"));
      const calificacionesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCalificaciones(calificacionesData);
    } catch (error) {
      console.error("Error al obtener las calificaciones: ", error.message);
    }
  };

  useEffect(() => {
    cargarCalificaciones();  
  }, []);

  const renderEstrellas = (calificacion) => {
    const estrellas = parseInt(calificacion.split(' ')[0]);  
    let estrellasArray = [];

    for (let i = 1; i <= 5; i++) {
      estrellasArray.push(
        <FontAwesome
          key={i}
          name={i <= estrellas ? "star" : "star-o"}  
          size={24}
          color={i <= estrellas ? "gold" : "gray"}
        />
      );
    }

    return <View style={{ flexDirection: "row" }}>{estrellasArray}</View>;
  };

  return (
    <View style={styles.container2}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Vehiculos registrados")}>
          <Text style={styles.topBarLink}>Vehículos registrados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
          <Text style={styles.topBarLink}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Historial citas")}>
          <Text style={styles.topBarLink}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
          <Text style={styles.topBarLink}>Reportes</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}> </Text>
      <Text style={styles.title2}>Calificaciones de la App</Text>
      <FlatList
        data={calificaciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card2}>
            <Text style={styles.clientName2}>{item.Usuario}</Text>
            {renderEstrellas(item.Calificacion)}
            <Text style={styles.rating2}>{item.Calificacion}</Text>
          </View>
        )}
      />
      <View style={styles.downBar}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/VolkswagenMX")}>
            <Text style={styles.topBarTexto}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")}>
            <Text style={styles.topBarTexto}>Ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tel1}>
            <Text style={styles.topBarTexto}>Soporte ✆</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
        <Text style={styles.topBarTexto}>© Volkswagen 2025 todos los derechos reservados</Text>
      </View>
    </View>
  );
}


function HistorialScreen() {
  const db = getFirestore();  
  const [historial, setHistorial] = useState([]);  

  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };

  
  const cargarHistorial = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "HIstorial_de_Servicios"));
      const historialData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistorial(historialData);
    } catch (error) {
      console.error("Error al obtener el historial: ", error.message);
    }
  };

  useEffect(() => {
    cargarHistorial();  
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Vehiculos registrados")}>
          <Text style={styles.topBarLink}>Vehiculos registrados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
          <Text style={styles.topBarLink}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Historial citas")}>
          <Text style={styles.topBarLink}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
          <Text style={styles.topBarLink}>Reportes</Text>
        </TouchableOpacity>
      </View>
      <Text>     </Text>
      <Text>     </Text>
      <Text>     </Text>
      <Text style={styles.title}>Historial de Servicios</Text>
      <ScrollView>
        <FlatList
          data={historial}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Image
                source={{ uri: item.Imagen }} 
                style={styles.imageExtended}
              />
              <View style={styles.infoContainerExtended}>
                <Text style={styles.text}>
                  <Text style={styles.label}>Servicio:</Text> {item.Servicio}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Fecha:</Text> {item.Fecha}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Costo:</Text> {item.Costo}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Vehículo:</Text> {item.Vehiculo}
                </Text>
              </View>
            </View>
          )}
        />
        
        <View style={styles.downBar}>
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/VolkswagenMX")}>
              <Text style={styles.topBarTexto}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")}>
              <Text style={styles.topBarTexto}>Ubicación</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={tel1}>
              <Text style={styles.topBarTexto}>Soporte ✆</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
          <Text style={styles.topBarTexto}>© Volkswagen 2025 todos los derechos reservados</Text>
        </View>
      </ScrollView>
    </View>
  );
}


function VehiculosRegisScreen() {
  
  const db = getFirestore(appFirebase);

  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };

  const [usuarios, setUsuarios] = useState([]);


  const cargarVehiculos = async () => {
    try {
      const consulta = await getDocs(collection(db, "VehiculosRegistrados"));
      const valoresDocumentos = consulta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(valoresDocumentos);
    } catch (error) {
      console.error("Error al obtener documentos:", error.message);
    }
  };


  useEffect(() => {
    cargarVehiculos();
  }, []);

  return (
    <View style={styles.container}>
   
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Vehiculos registrados")}>
          <Text style={styles.topBarLink}>Vehículos registrados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
          <Text style={styles.topBarLink}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Historial citas")}>
          <Text style={styles.topBarLink}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
          <Text style={styles.topBarLink}>Reportes</Text>
        </TouchableOpacity>
      </View>
    
      <Text style={styles.title}>         </Text>
      <Text style={styles.title}>         </Text>
      <Text style={styles.title}>Vehículos</Text>
      <ScrollView>
        {usuarios.length === 0 ? (
          <Text>No hay vehículos registrados.</Text>
        ) : (
          usuarios.map((usuario, index) => (
            <View key={index} style={styles.infoContainerExtended}>
              <Text style={styles.usuarioNombre}>Vehículo: {usuario.Vehiculo}</Text>
              <Text style={styles.usuarioDetalle}>ID: {usuario.id}</Text>
              <Text style={styles.usuarioDetalle}>Propietario: {usuario.Propietario}</Text>
              <Text style={styles.usuarioDetalle}>Tipo: {usuario.Tipo}</Text>
              <Text style={styles.usuarioDetalle}>Placas: {usuario.Placas}</Text>
              <Text style={styles.usuarioDetalle}>Color: {usuario.Color}</Text>
              <Text style={styles.usuarioDetalle}>Transmisión: {usuario.Transmision}</Text>
              {usuario.Imagen ? (
                <Image source={{ uri: usuario.Imagen }} style={styles.image} />
              ) : (
                <Text style={styles.usuarioDetalle}>Sin imagen disponible</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>

  
      <View style={styles.downBar}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/VolkswagenMX")}>
            <Text style={styles.topBarTexto}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")}>
            <Text style={styles.topBarTexto}>Ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tel1}>
            <Text style={styles.topBarTexto}>Soporte ✆</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
        <Text style={styles.topBarTexto}>© Volkswagen 2025 todos los derechos reservados</Text>
      </View>
    </View>
  );
}




function ReportesScreen() {
  const db = getFirestore();  
  const [citas, setCitas] = useState([]); 
  const [vehiculos, setVehiculos] = useState([]);  

  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };

  const cargarCitas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "CitasReporte"));
      const citasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCitas(citasData);
    } catch (error) {
      console.error("Error al obtener las citas: ", error.message);
    }
  };

  
  const cargarVehiculos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "VehiculosReporte"));
      const vehiculosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVehiculos(vehiculosData);
    } catch (error) {
      console.error("Error al obtener los vehículos: ", error.message);
    }
  };

  useEffect(() => {
    cargarCitas();  
    cargarVehiculos();  
  }, []);

  return (
    <View style={styles.container5}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Vehiculos registrados")}>
          <Text style={styles.topBarLink}>Vehículos registrados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
          <Text style={styles.topBarLink}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Historial citas")}>
          <Text style={styles.topBarLink}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
          <Text style={styles.topBarLink}>Reportes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text>      </Text>
        <Text>      </Text>
        <Text>      </Text>
        <Text style={styles.title}>Reportes</Text>
        
        <Text style={styles.sectionTitle}>Citas</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Cliente</Text>
            <Text style={styles.tableHeader}>Fecha</Text>
            <Text style={styles.tableHeader}>Hora</Text>
          </View>
          {citas.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.tableCell}>{item.Cliente}</Text>
              <Text style={styles.tableCell}>{item.Fecha}</Text>
              <Text style={styles.tableCell}>{item.Hora}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Vehículos Registrados</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Placa</Text>
            <Text style={styles.tableHeader}>Marca</Text>
            <Text style={styles.tableHeader}>Modelo</Text>
          </View>
          {vehiculos.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.tableCell}>{item.Placa}</Text>
              <Text style={styles.tableCell}>{item.Marca}</Text>
              <Text style={styles.tableCell}>{item.Modelo}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.downBar}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/VolkswagenMX")}>
            <Text style={styles.topBarTexto}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")}>
            <Text style={styles.topBarTexto}>Ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tel1}>
            <Text style={styles.topBarTexto}>Soporte ✆</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
        <Text style={styles.topBarTexto}>© Volkswagen 2025 todos los derechos reservados</Text>
      </View>
    </View>
  );
}

function RegistrarVehiculo() {
  const tel1 = () => {
    Linking.openURL("tel:" + "2215856905");
  };
  const db = getFirestore(appFirebase);

  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    Propietario: "",
    Vehiculo: "",
    Tipo: "",
    Placas: "",
    Color: "",
    Transmision: "",
    Imagen: "",
  });

  const [documentIdActualizar, setDocumentIdActualizar] = useState(""); 
  const [documentIdEliminar, setDocumentIdEliminar] = useState(""); 
  const agregarVehiculo = async () => {
    try {

      if (
        !nuevoVehiculo.Propietario ||
        !nuevoVehiculo.Vehiculo ||
        !nuevoVehiculo.Tipo ||
        !nuevoVehiculo.Placas ||
        !nuevoVehiculo.Color ||
        !nuevoVehiculo.Transmision
      ) {
        alert("Por favor, completa todos los campos.");
        return;
      }
  
      const docRef = await addDoc(collection(db, "VehiculosRegistrados"), {
        Propietario: nuevoVehiculo.Propietario,
        Vehiculo: nuevoVehiculo.Vehiculo,
        Tipo: nuevoVehiculo.Tipo,
        Placas: nuevoVehiculo.Placas,
        Color: nuevoVehiculo.Color,
        Transmision: nuevoVehiculo.Transmision,
        Imagen: nuevoVehiculo.Imagen || "", 
      });
      console.log("Vehículo registrado con ID:", docRef.id);
  
   
      setNuevoVehiculo({
        Propietario: "",
        Vehiculo: "",
        Tipo: "",
        Placas: "",
        Color: "",
        Transmision: "",
        Imagen: "",
      });
      alert("Vehículo agregado correctamente");
    } catch (error) {
      console.error("Error al agregar el vehículo:", error.message);
      alert(`Error: ${error.message}`);
    }
  };
  const actualizarVehiculo = async () => {
    try {
      if (!documentIdActualizar.trim()) {
        alert("Por favor, ingresa el ID del documento a actualizar.");
        return;
      }

      const docRef = doc(db, "VehiculosRegistrados", documentIdActualizar);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          Propietario: nuevoVehiculo.Propietario || docSnap.data().Propietario,
          Vehiculo: nuevoVehiculo.Vehiculo || docSnap.data().Vehiculo,
          Tipo: nuevoVehiculo.Tipo || docSnap.data().Tipo,
          Placas: nuevoVehiculo.Placas || docSnap.data().Placas,
          Color: nuevoVehiculo.Color || docSnap.data().Color,
          Transmision: nuevoVehiculo.Transmision || docSnap.data().Transmision,
          Imagen: nuevoVehiculo.Imagen || docSnap.data().Imagen,
        });
        alert(`Documento con ID "${documentIdActualizar}" actualizado correctamente.`);
        setNuevoVehiculo({
          Propietario: "",
          Vehiculo: "",
          Tipo: "",
          Placas: "",
          Color: "",
          Transmision: "",
          Imagen: "",
        });
        setDocumentIdActualizar("");
      } else {
        alert(`El documento con ID "${documentIdActualizar}" no existe.`);
      }
    } catch (error) {
      console.error("Error al actualizar el documento:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const eliminarVehiculo = async () => {
    try {
      if (!documentIdEliminar.trim()) {
        alert("Por favor, ingresa el ID del documento a eliminar.");
        return;
      }

      const docRef = doc(db, "VehiculosRegistrados", documentIdEliminar);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await deleteDoc(docRef);
        alert(`Documento con ID "${documentIdEliminar}" eliminado correctamente.`);
        setDocumentIdEliminar("");
      } else {
        alert(`El documento con ID "${documentIdEliminar}" no existe.`);
      }
    } catch (error) {
      console.error("Error al eliminar el documento:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
       <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Vehiculos registrados")}
        >
          <Text style={styles.topBarLink}>Vehículos registrados</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Citas")}>
          <Text style={styles.topBarLink}>Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Historial citas")}
        >
          <Text style={styles.topBarLink}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Reportes")}>
          <Text style={styles.topBarLink}>Reportes</Text>
        </TouchableOpacity>
      </View>
      <Text>    </Text>
      <Text>    </Text>
      <Text>    </Text>
      <ScrollView>
      <Text style={styles.title}>Registrar Nuevo Vehículo</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Propietario"
        value={nuevoVehiculo.Propietario}
        onChangeText={(text) => setNuevoVehiculo({ ...nuevoVehiculo, Propietario: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehículo"
        value={nuevoVehiculo.Vehiculo}
        onChangeText={(text) => setNuevoVehiculo({ ...nuevoVehiculo, Vehiculo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={nuevoVehiculo.Tipo}
        onChangeText={(text) => setNuevoVehiculo({ ...nuevoVehiculo, Tipo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Placas"
        value={nuevoVehiculo.Placas}
        onChangeText={(text) => setNuevoVehiculo({ ...nuevoVehiculo, Placas: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={nuevoVehiculo.Color}
        onChangeText={(text) => setNuevoVehiculo({ ...nuevoVehiculo, Color: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Transmisión"
        value={nuevoVehiculo.Transmision}
        onChangeText={(text) => setNuevoVehiculo({ ...nuevoVehiculo, Transmision: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de Imagen (opcional)"
        value={nuevoVehiculo.Imagen}
        onChangeText={(text) => setNuevoVehiculo({ ...nuevoVehiculo, Imagen: text })}
      />
      <TouchableOpacity style={styles.button} onPress={agregarVehiculo}>
        <Text style={styles.buttonText}>Agregar Vehículo</Text>
      </TouchableOpacity>

      {/** Inputs para actualizar */}
      <Text style={styles.title}>Actualizar Vehículo</Text>
      <TextInput
        style={styles.input}
        placeholder="ID del Documento a Actualizar"
        value={documentIdActualizar}
        onChangeText={(text) => setDocumentIdActualizar(text)}
      />
      <TouchableOpacity style={styles.button} onPress={actualizarVehiculo}>
        <Text style={styles.buttonText}>Actualizar Vehículo</Text>
      </TouchableOpacity>

      {/** Inputs para eliminar */}
      <Text style={styles.title}>Eliminar Vehículo</Text>
      <TextInput
        style={styles.input}
        placeholder="ID del Documento a Eliminar"
        value={documentIdEliminar}
        onChangeText={(text) => setDocumentIdEliminar(text)}
      />
      <TouchableOpacity style={styles.button} onPress={eliminarVehiculo}>
        <Text style={styles.buttonText}>Eliminar Vehículo</Text>
      </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.downBar}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/VolkswagenMX")}>
            <Text style={styles.topBarTexto}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://maps.app.goo.gl/vFyTStcQUGPsUSdH8")}>
            <Text style={styles.topBarTexto}>Ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={tel1}>
            <Text style={styles.topBarTexto}>Soporte ✆</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.topBarTexto}>Aviso de privacidad</Text>
        <Text style={styles.topBarTexto}>© Volkswagen 2025 todos los derechos reservados</Text>
      </View>
    </View>
    
  );
}

const Drawer = createDrawerNavigator();

function MainApp() {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Ventas" component={VentasScreen} />
      <Drawer.Screen name="Rentas" component={RentasScreen} />
      <Drawer.Screen name="Citas" component={CitasScreen} />
      <Drawer.Screen name="Historial_Servicios" component={HistorialScreen} />
      <Drawer.Screen
        name="Vehiculos registrados"
        component={VehiculosRegisScreen}
      />
      <Drawer.Screen name="Reportes" component={ReportesScreen} />
      <Drawer.Screen name="Registrar Vehiculo" component={RegistrarVehiculo} />
      <Drawer.Screen name="Calificaciones de la app" component={CalificarApp} />
    </Drawer.Navigator>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  heroImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  carModels: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  horizontalScroll: {
    marginVertical: 10,
  },
  horizontalContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  itemContainer: {
    marginRight: 20,
    alignItems: "center",
  },
  scrollImage: {
    width: 200,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#141f5d",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  errorTexto: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#141f5d",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 60,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  topBarTexto: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  downBar: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#141f5d",
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingBottom: 20,
    zIndex: 100,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  topBarLink: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  imageExtended: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainerExtended: {
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title2: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003d73",
    marginBottom: 20,
    textAlign: "center",
  },
  card2: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  clientName2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004a91",
    marginBottom: 5,
  },
  rating2: {
    fontSize: 16,
    color: "#0072d5",
    fontStyle: "italic",
  },
  table: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    color: "#0033a0",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    color: "#333333",
    textAlign: "center",
  },
  container5: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    justifyContent: "space-between",
  },
  usuarioContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  usuarioNombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  usuarioDetalle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
});
