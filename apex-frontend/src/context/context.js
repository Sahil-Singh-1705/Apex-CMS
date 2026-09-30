import { createContext} from 'react';

export const ModalContext = createContext({
  isOpen: false,
  data: {},
  type: "",
  submitData: {},
  setSubmitData: (data) => {},
  onOpen: (data, type) => {},
  onClose: (data) => {},
  
});

export const PreviewContext = createContext({
  isOpen: false,
  onOpen: (data) => {},
  content: "",
});

export const AlertContext = createContext({
setAlert:()=>{}
});


export const LanguageContext = createContext();