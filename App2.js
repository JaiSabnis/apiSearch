import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Card, CardItem, Button, Icon } from "native-base";
import { Container, Header, Content, Item } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class SongSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      query: "",
    };
  }

  getData = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        });
      })
      .catch((error) => console.log(error));
  };

  search = (query, mediaType, entity) => {
    /*
    MEDIATYPES: 
    "movie", "movie"
    "music", "song"
    "podcast", "podcast"
    "ebook", "ebook"
    "tvShow", "tvSeason"
    */

    var url =
      "https://itunes.apple.com/search?term=" +
      query +
      "&media=" +
      mediaType +
      "&entity=" +
      entity +
      "&limit=20";
    this.getData(url);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    } else {
      return (
        <Container>
          <Item
            rounded
            style={{
              width: width * 0.9,
              alignSelf: "center",
              marginTop: height * 0.1,
            }}
          >
            <Ionicons
              name="ios-search"
              size={50}
              color="#8B78E6"
              style={{ marginLeft: width * 0.05 }}
            />
            <TextInput
              placeholder="Search"
              onChangeText={(text) => {
                this.search(text, "music", "song");
              }}
            />
          </Item>

          <FlatList
            data={this.state.dataSource}
            keyExtractor={(item) => item.trackId}
            renderItem={({ item }) => (
              <Card style={styles.listCard}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  source={{ uri: item.artworkUrl100 }}
                />
                <View
                  style={{
                    marginLeft: 10,
                    alignSelf: "center",
                    width: width * 0.4,
                  }}
                >
                  <Text
                    style={{ fontSize: 25, fontWeight: "800", color: "white" }}
                  >
                    {item.trackName}
                  </Text>
                  <Text style={{ fontSize: 13, color: "white" }}>
                    {item.artistName}
                  </Text>
                </View>
              </Card>
            )}
          />
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listCard: {
    borderRadius: 20,
    width: width * 0.9,
    alignSelf: "center",
    backgroundColor: "#99AAAB",
    flexDirection: "row",
  },
});
