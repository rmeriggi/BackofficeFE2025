import axios from "axios"

const EXTERNALIMPUTATIONS_URL = {
  UPLOADFILE: "/api"
}

export const uploadFile = async(body) => {
  try {
    axios.post(EXTERNALIMPUTATIONS_URL.UPLOADFILE, body, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  } catch (error) {
    console.error(error)
  }
}