import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
  logo:{
    marginTop:'25%',
    alignSelf:'center'
    ,
    width:150,
    height:150,
},
  inputt:{
    marginTop:'5%',
    fontSize:18,
    height:40,
    width:'100%',
    backgroundColor:'#fff',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#333'
  },
  input:{
    fontSize:18,
    height:40,
    width:'80%',
    backgroundColor:'#fff',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#333'
  },
  
  container: {
    backgroundColor:"#fff",
    
  },
  palavras:{
      fontSize:18,
      borderBottomWidth: 1,
      paddingBottom:20,
      paddingTop:20,
      paddingLeft:8,
      borderBottomColor:"#ccc",
  },
  wordTra:{
    marginTop:'1%',
    fontSize:25,
    paddingBottom:0,
    fontWeight:"bold",
    paddingLeft:5, 
    paddingTop:5
  },
  tradu:{
    fontWeight: "bold",
    fontSize:18,
    paddingLeft:5, 
    paddingTop:10,
  }
}
);

export {css};