import {
    qrController,
    deleteCookie,
  } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/whatsauth.js";
  import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/config.js";
  
  wauthparam.auth_ws = "d3NzOi8vYXBpLndhLm15LmlkL3dzL3doYXRzYXV0aC9wdWJsaWM=";
  //wauthparam.keyword="aHR0cHM6Ly93YS5tZS82Mjg5NTgwMDAwNjAwMD90ZXh0PXdoNHQ1YXV0aDA=";
  wauthparam.keyword = "aHR0cHM6Ly93YS5tZS82Mjg1OTIyMDI0MDA3P3RleHQ9TE9HSU4gV09J";
  wauthparam.tokencookiehourslifetime = 18;
  wauthparam.redirect = "/auth";
  deleteCookie(wauthparam.tokencookiename);
  qrController(wauthparam);