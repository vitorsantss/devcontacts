const errorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
      if (error.response.data.error.message.phone) {
        return error.response.data.error.message.phone;
      } else if (error.response.data.error.message.email) {
        return error.response.data.error.message.email;
      } else if (error.response.data.error.message.password) {
        return error.response.data.error.message.password;
      } else {
        return error.response.data.error.message;
      }
    } else {
      return "Erro interno do servidor";
    }
};

export default errorMessage;