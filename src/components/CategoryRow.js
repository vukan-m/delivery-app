import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {urlFor} from '../../sanity';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/solid';
import {color} from '../constants/color';
import sanityClient from '../../sanity';
import DishRow from './DishRow';

const CategoryRow = ({name, image, restaurantId, categoryId}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "dish" && restaurant._ref == $restaurantId && category._ref == $categoryId] {
      ...,
}
    `,
        {restaurantId, categoryId},
      )
      .then(data => {
        setDishes(data);
      });
  }, [restaurantId, categoryId]);

  const Dishes = useCallback(() => {
    return dishes?.map(dish => (
      <DishRow
        key={dish._id}
        id={dish._id}
        name={dish.name}
        description={dish.short_description}
        price={dish.price}
        image={dish.image}
      />
    ));
  }, [dishes]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && 'border-b-0'
        }`}>
        <View className="flex-row">
          <View className="flex-row flex-1 pr-2 items-center space-x-2">
            <Text className="text-xl mb-1">{name}</Text>
            {isPressed ? (
              <ChevronUpIcon color={color} size={22} />
            ) : (
              <ChevronDownIcon color={color} size={22} />
            )}
          </View>

          <View>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                borderWidth: 1,
                borderColor: '#F3F3F4',
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && <Dishes />}
    </>
  );
};

export default CategoryRow;
