import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Currency from 'react-currency-formatter';
import {urlFor} from '../../sanity';
import {MinusCircleIcon, PlusCircleIcon} from 'react-native-heroicons/solid';
import {color} from '../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from '../../slices/basketSlice';

const DishRow = ({id, name, description, price, image}) => {
  const items = useSelector(state => selectBasketItemsWithId(state, id));
  const [isPressed, setIsPressed] = useState(items?.length > 0 ? true : false);
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({id, name, description, price, image}));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) {
      return;
    }
    dispatch(removeFromBasket({id}));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-gray-100 border px-4 py-2 border-gray-300 ${
          isPressed && 'border-b-0'
        }`}>
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            {description ? (
              <Text className="text-gray-400">{description}</Text>
            ) : null}
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="RSD" />
            </Text>
          </View>

          <View className="justify-center">
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

      {isPressed && (
        <View className="bg-gray-100 px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? color : 'gray'}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={color} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
