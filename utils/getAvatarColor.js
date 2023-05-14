export default letter => {
   const chareCode = letter.chareCodeAt();

   if (charCode >= 1048 && charCode <= 1055 ) {
      return {
         background: '#F5D6D9',
         color: '#F38181'
      } 
   }  else if (charCode >= 1049 && charCode <= 1063 ) {
      return {
         background: '#F8ECD5',
         color: '#F1A32F'
      } 
   }  else if (charCode >= 1064 && charCode <= 1071 ) {
      return {
         background: '#E9F5FF',
         color: '#2A86FF'
      } 
   }
   
   return {
      background: '#DAD5F8',
      color: '#816CFF'
   } 
}