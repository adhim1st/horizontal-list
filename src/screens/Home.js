import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData, toggleHeart } from "../store/actions/productAction";
import tailwind from "tailwind-rn";
import StarRating from "react-native-star-rating";
import { FontAwesome } from "@expo/vector-icons";

export default function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productReducer.productData);
  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  function ConvertRupiah(number) {
    let reverse = number.toString().split("").reverse().join("");
    let thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand.join(".").split("").reverse().join("");
    return thousand;
  }

  function CalculateDiscount(number, discount) {
    discount = discount / 100;
    let total = number - number * discount;
    return Math.floor(total / 1000) * 1000;
  }

  function heartPressed(heart, id) {
    dispatch(toggleHeart({ heart, id }));
  }

  return (
    <View>
      <View
        style={tailwind("flex-row justify-start items-center content-start")}
      >
        <Text style={tailwind("ml-2 mt-1 text-lg font-bold")}>
          Terakhir dilihat
        </Text>
        <Text style={tailwind("ml-2 mt-2 text-sm font-bold text-yellow-500")}>
          Lihat Semua
        </Text>
      </View>
      <FlatList
        horizontal
        data={product}
        renderItem={({ item, index }) => (
          <View
            style={[
              tailwind("flex m-2 h-72 w-40 rounded overflow-hidden"),
              styles.shadow,
            ]}
          >
            <View style={tailwind("flex-initial bg-gray-200 h-40 w-full")}>
              <Image
                resizeMode="stretch"
                source={{ uri: item.img_url }}
                style={tailwind("h-full w-full ")}
              />
            </View>
            <View style={tailwind("bg-white flex-1 max-w-2xl ")}>
              <View style={tailwind("mx-2 flex-1 justify-center items-end")}>
                <TouchableOpacity
                  underlayColor="#DDDDDD"
                  onPress={() => {
                    heartPressed(item.heart, item.id);
                  }}
                >
                  <FontAwesome
                    name={item.heart == true ? "heart" : "heart-o"}
                    size={26}
                    style={tailwind("ml-2 ")}
                    color={"red"}
                  />
                </TouchableOpacity>
              </View>
              <View style={tailwind("flex-1 my-2 mx-2  justify-center ")}>
                <Text
                  style={tailwind("text-sm font-semibold")}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>

              {item.cashback == true && (
                <View style={tailwind("flex-1 mx-2 justify-center")}>
                  <View
                    style={tailwind("bg-yellow-100 w-14 rounded items-center")}
                  >
                    <Text style={tailwind("text-yellow-600 text-xs font-bold")}>
                      Cashback
                    </Text>
                  </View>
                </View>
              )}
              {item.discount > 0 && (
                <View
                  style={tailwind(
                    "flex-1 mx-2 justify-start flex-row items-baseline mt-2"
                  )}
                >
                  <View
                    style={tailwind("bg-gray-100 w-6 rounded items-center ")}
                  >
                    <Text style={tailwind("text-xs text-red-500 font-bold ")}>
                      {item.discount}%
                    </Text>
                  </View>
                  <Text
                    style={tailwind("ml-2 line-through text-xs text-gray-400")}
                  >
                    Rp {ConvertRupiah(item.price)}
                  </Text>
                </View>
              )}
              <View style={tailwind("flex-1 mx-2 justify-center")}>
                <Text style={tailwind("text-sm font-bold")}>
                  Rp{" "}
                  {ConvertRupiah(CalculateDiscount(item.price, item.discount))}
                </Text>
              </View>
              <View
                style={tailwind("flex-1 ml-2 flex-row w-20 items-baseline")}
              >
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={item.star_rating}
                  fullStarColor={"yellow"}
                  starSize={16}
                />
                <Text style={tailwind("mx-2 text-gray-400")}>
                  ({item.star_count})
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
