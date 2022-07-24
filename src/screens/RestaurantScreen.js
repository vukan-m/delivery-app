import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {urlFor} from '../../sanity';
import {
  ArrowLeftIcon,
  StarIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
} from 'react-native-heroicons/solid';
import {QuestionMarkCircleIcon} from 'react-native-heroicons/outline';
import {color} from '../constants/color';
import BasketIcon from '../components/BasketIcon';
import {useDispatch, useSelector} from 'react-redux';
import {setRestaurant} from '../../slices/restaurantSlice';
import CategoryRow from '../components/CategoryRow';
import {selectBasketItems} from '../../slices/basketSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      address,
      short_description,
      categories,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        address,
        short_description,
        long,
        lat,
      }),
    );
  }, [
    address,
    dispatch,
    id,
    imgUrl,
    rating,
    short_description,
    title,
    long,
    lat,
  ]);

  const Categories = useCallback(() => {
    return categories?.map(category => (
      <CategoryRow
        key={category._id}
        name={category.name}
        image={category.image}
        categoryId={category._id}
        restaurantId={id}
      />
    ));
  }, [categories, id]);

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4 h-"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-8 left-5 p-2 bg-gray-100 rounded-full">
            <ArrowLeftIcon size={20} color={color} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text>
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  Nearby · {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Got food alergies?
            </Text>
            <ChevronRightIcon color={color} />
          </TouchableOpacity>
        </View>

        <View className={`pb-10 ${items.length && 'pb-32'}`}>
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          <Categories />
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
