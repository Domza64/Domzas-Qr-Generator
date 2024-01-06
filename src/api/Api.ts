import axios from "axios";

export const GET_QR_CODE = "/getQRCode";

// TODO - auto replace this on build
export default axios.create({baseURL: 'http://localhost:8081/qrGen'});
//export default axios.create({baseURL: 'https://domza-api.domza.xyz/qrgen'});