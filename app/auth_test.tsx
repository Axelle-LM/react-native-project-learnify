
// // import React, { useState, useEffect } from 'react';
// // import { View, Text, FlatList } from 'react-native';
// // import { supabase } from '../utils/supabase';
// // import { AuthProvider } from '@/context/AuthContext';

// // export default function AuthTest() {

// //   return (
// //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text>Todo List</Text>
// //       <Text>{AuthProvider().user?.name}</Text>
// //     </View>
// //   );
// // };

// import { supabase } from '@/utils/supabase';
// import React, { useState, useEffect } from 'react';
// import { FlatList, ActivityIndicator, Text } from 'react-native';

// type User = {

//   id: string,
//   name: string, 
//   email: string

// }

// const LazyLoadData = () => {
//   const [data, setData] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(supabase.auth.getSession())
//       .then(response => response.json())
//       .then(json => {
//         console.log(json)
//         setData(json);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   return (
//     <FlatList
//       data={data}
//       renderItem={({ item }) => <Text>{item.name}</Text>}
//       keyExtractor={item => item.id.toString()}
//     />
//   );
// };

// export default LazyLoadData;


