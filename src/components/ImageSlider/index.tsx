import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

type ImageSlideProps = {
  imagesUrls: string[];
};

type ChangeImageProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

export function ImageSlider({ imagesUrls }: ImageSlideProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrls.map((_, index) => (
          <ImageIndex key={String(index)} active={index === imageIndex} />
        ))}
      </ImageIndexes>
      <FlatList
        data={imagesUrls}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}
