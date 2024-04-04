import { View, FlatList, Image,} from 'react-native'
import React, { useEffect, useState } from "react";
import { myColors } from '../../Utils/MyColors'
import authFetch from '../../Data/API';


const ImageScreen = () => {

  const [movie, setmovie] = useState([]);
  const [pages, setpage] = useState(1);


  const PopularMovie = async () => {
    try {
      const { data } = await authFetch.get(`/3/movie/popular?language=en-US&page=${pages}`);
      setpaginationno(0);
      if (!movie.length > 0) {
        setmovie(data.results)
      } else {
        setmovie([...movie, ...data.results])
      }
      setpaginationno(data.total_pages)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (number) => {
    setpage(number);
  }

  useEffect(() => {
    PopularMovie();
  }, [pages])


  return (
    <View>
      <FlatList
        data={movie}
        renderItem={({ item }) => {
          return (
            <View style={{
              flex: 1,
              flexDirection: 'column',
              height: 160,
              margin: 10,
              backgroundColor: myColors.darkblue,
              borderRadius: 30,
              justifyContent: 'center',
              elevation : 10

            }}>

              <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }} 
              style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: 30,
                 }} />
            </View>
          );
        }}
        numColumns={2}
        onEndReachedThreshold={0.2}
        onEndReached={() => { handleClick(pages + 1) }}
      />
    </View>
  )
}

export default ImageScreen