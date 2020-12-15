import {useState} from 'react';

const types = {
  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
    message: 'CPF inválido',
  },
  creditCardExpiry: {
    regex: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
    message: 'Data inválida',
  },
  creditCard:{
    regex: {
        visa: /^4[0-9]{12}(?:[0-9]{3})/,
        mastercard: /^5[1-5][0-9]{14}/,
        amex: /^3[47][0-9]{13}/,
        dinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}/
    },
    message: 'Cartão inválido',
  }
};

const useForm = (type) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  function validate(value) {

    if (type === "cpf"){
      let cleanValue = value.replace(/\D/g,'');
      let cpfFormated = cleanValue.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4");
      setValue(cpfFormated);

      if(!types[type].regex.test(cpfFormated)){
        setError(types[type].message);
        return false;
      }
    }

    if (type === "creditCardExpiry"){
      if(!types[type].regex.test(value)){
        setError(types[type].message);
        return false;
      }
    }

    if (type === "creditCard"){
      let cleanValue = value.replace(/\D/g,'');
      if( 
        !types[type].regex.visa.test(cleanValue) &&
        !types[type].regex.mastercard.test(cleanValue) &&
        !types[type].regex.amex.test(cleanValue) &&
        !types[type].regex.dinersClub.test(cleanValue) &&
        !types[type].regex.discover.test(cleanValue) &&
        !types[type].regex.jcb.test(cleanValue)
       ){
        setError(types[type].message);
        return false;
      }else{
        setValue(cleanValue);
      }
    }

    if (type === false) return true;
    if (value.length === 0) {
        setError('Preencha este campo');
        return false;
    } else {
        setError(null);
        return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);

    if (type === "creditCardExpiry"){
      let cleanValue = target.value.replace(/\D/g,'');
      let creditCardExpiryFormated = cleanValue.replace(/(\d{2})?(\d{4})$/, "$1/$2");
      setValue(creditCardExpiryFormated);
    }else if( type === "transactionValue"){
        let myValue = target.value

        myValue = myValue + '';
        myValue = parseInt(myValue.replace(/[\D]+/g, ''));
        myValue = myValue + '';
        myValue = myValue.replace(/([0-9]{2})$/g, ",$1");

        if (myValue.length > 6) {
            myValue = myValue.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        setValue('R$ ' + myValue)
        if(myValue == 'NaN') setValue('');
    }else{
      setValue(target.value);
    }
  }

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};

export default useForm;



// else if ( types[type] === 'cpf' && !types[type].regex.test(cpfFormated)) {
//   setError(types[type].message);
//   return false; 
// }else if ( types[type] === 'creditCardExpiry' && !types[type].regex.test(creditCardExpiryFormated)) {
//   setError(types[type].message);
//   return false
// }