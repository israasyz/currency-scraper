const getCurrID = (check) => {
    const patterns = {
        USD: /U.?S.?D|^U.?S.?A?|United ?States/gmi,
        EUR: /E.?U.?R.?O?/gmi,
        GBP: /G.?B.?P?|Sterling|British/gmi,
        CHF: /C.?H.?F|Swiss|Franc/gmi,
        JPY: /J.?P.?Y|Japan(ese)?|Yen/gmi,  
        AED: /U.?A.?E|Emirati?(es)?|A.?E.?D|Dubai/gmi,
        SAR: /S.?A.?R|Saudia?/gmi,
        KWD: /K.?W.?D|Kuwaiti?/gmi,
        CNY: /C.?N.?Y|China?(ese)?|Yuan/gmi
    };

    for (let i = 0; i < Object.keys(patterns).length; i++){
        if (patterns[Object.keys(patterns)[i]].test(check))
            return Object.keys(patterns)[i];
    }

    return 'N/A';
};

const toFloat = (value) => {
    if (isNaN(value))
        value = value.replace(/[^\d.]/gmi, '');

    if (value.length === 0)
        return 'N/A';
  
    return parseFloat(value);
};

module.exports = {
    getCurrID,
    toFloat
};
