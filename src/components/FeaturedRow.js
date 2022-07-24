import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import {color} from '../constants/color';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../../sanity';

const FeaturedRow = ({id, title, description}) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured" && _id == $id] {
            ...,
            restaurants[]->{
              ...,
              categories[]-> {
                _id,
                name,
                image
              }
          }
          }[0]
          `,
        {id},
      )
      .then(data => {
        setRestaurants(data?.restaurants);
      });
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={color} />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-4">
        {restaurants?.map(restaurant => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            address={restaurant.address}
            short_description={restaurant.short_description}
            categories={restaurant.categories}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
