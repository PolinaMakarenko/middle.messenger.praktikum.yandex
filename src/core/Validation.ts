enum ErorrMessage {
    LOGIN = "от 3 до 20 символов, латиница, цифры",
    PASSWORD = "от 8 до 40 символов,латиница, цифры,хотя бы одна заглавная буква и цифра",
    PHONE ="от 10 до 15 символов, цифры",
    MESSAGE = "Поле не должно быть пустым",
    FSNAME = "Первая буква заглавная, без пробелов и цифр",
    EMAIL = "Введите корректный email",
    DISPNAME = "Первая буква заглавная, без пробелов и цифр",
}

const chekValid = (name: string, checValue: string): string => {
    if (name == "login") {
    const regExp = /^(?!^\d+)[a-zA-z0-9-_]{3,20}$/;
    return (regExp.test(checValue)? "" : ErorrMessage.LOGIN )
    }
    if (name == "password" || name == "newPassword" || name == "oldPassword") {
    const regExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    return (regExp.test(checValue)? "" : ErorrMessage.PASSWORD )
    }
    if (name == "phone") {
        const regExp = /^[+-d]?\d{10,15}$/;
        return (regExp.test(checValue)? "" : ErorrMessage.PHONE )
    }
    if (name == "message") {
        const regExp = /^.+$/;
        return (regExp.test(checValue)? "" : ErorrMessage.MESSAGE )
    }
    if(name == "first_name" || name == "second_name") {
        const regExp= /^[А-ЯA-Z]{1}[а-яa-z-]*$/;
        return (regExp.test(checValue)? "" : ErorrMessage.FSNAME )
    }
    if (name == "email") {
        const regExp= /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
        return (regExp.test(checValue)? "" : ErorrMessage.EMAIL )
    } 
    if (name == "display_name") {
        const regExp= /^[А-ЯA-Z]{1}[а-яa-z-]*$/;
        return (regExp.test(checValue)? "" : ErorrMessage.DISPNAME)
    } else {
        return ""
    }
}
  
export const checkInputValue = (event:HTMLInputElement): boolean => {
    const parent = event.parentElement as HTMLElement;
    const error = parent.querySelector(".error-message");
    (error as HTMLElement ).textContent = chekValid( event.name, event.value );
    return ((error as HTMLElement ).textContent)? false : true

};


export const focusin = (event:InputEvent): void => {
    checkInputValue(event.target as HTMLInputElement)
};
  
export const focusout = (event:InputEvent): void => {
    checkInputValue(event.target as HTMLInputElement)
};

export const submit = (event: Event): void =>{
    event.preventDefault();
    const allFormInputs = document.querySelectorAll("input");
    const data: Record<string, string> = {};
    allFormInputs.forEach((input: HTMLInputElement) => {
        (checkInputValue(input)) ? data[input.name] = input.value : ""
    });
    (allFormInputs.length == Object.keys(data).length) 
    ? ( console.log(data), 
   (event.target as HTMLFormElement ).reset()): ""

}

export const submitMess = (event: SubmitEvent): void =>{
    event.preventDefault();
    const inputForm = (event.target as HTMLElement ).getElementsByTagName("input")
    const data: Record<string, string> = {};
    const error = document.querySelector(".error-message");
    if (chekValid( inputForm[0].name, inputForm[0].value )) {
        (error as HTMLElement).textContent = chekValid( inputForm[0].name, inputForm[0].value )
    } else {
        (error as HTMLElement).textContent = "";
        data[inputForm[0].name] = inputForm[0].value;
        console.log(data); 
        (event.target as HTMLFormElement ).reset()
    }
}


  