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
    if (name == "password") {
    const regExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    return (regExp.test(checValue)? "" : ErorrMessage.PASSWORD )
    }
    if (name == "phone") {
        const regExp = /^[+-d]?\d{10,15}$/;
        return (regExp.test(checValue)? "" : ErorrMessage.PHONE )
    }
    if (name == "message") {
        const regExp = /^[+-d]?\d{10,15}$/;
        return (regExp.test(checValue)? "" : ErorrMessage.MESSAGE )
    }
    if(name == "first_name" || name == "second_name") {
        const regExp= /^[А-ЯA-Z]{1}[а-яa-z-]*$/;
        return (regExp.test(checValue)? "" : ErorrMessage.FSNAME )
    }
    if (name == "email") {
        const regExp= /^[A-Za-z0-9\-]+@[A-Za-z]+(\.[A-Za-z]+)+$/;
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
    // const targetInput = event.target as HTMLInputElement;
    // console.log(event)
    // console.log(targetInput.value)

    const parent = event.parentElement;
    // console.log(parent)

    const error = parent?.querySelector(".error-message");
    error!.textContent = chekValid( event.name, event.value );
    // console.log(error);
    // error?.display = 'block'

    return (error!.textContent)? false : true
  
    // parent!.style.position = "relative";
  
    // const nameInput = validationInputs[targetInput.name];
    // console.log(nameInput);
    
    // const isValid = nameInput.regExp.test(targetInput.value);
  
    // if (!isValid) {
    //   error!.textContent = nameInput.errorMessage;
    // } else {
    //   error!.textContent = "";
    // }
};



export const focusin = (event:InputEvent): void => {
    console.log(event)
    // const eventInput = event.target as HTMLInputElement;
    checkInputValue(event.target as HTMLInputElement)
};
  
export const focusout = (event:InputEvent): void => {
    // const eventInput = event.target as HTMLInputElement;
    checkInputValue(event.target as HTMLInputElement)
};

export const submit = (event: Event): void =>{
    event.preventDefault();
    console.log(event.target)
    // console.log(event.srcElement)
    // const inputs = event.getElementsByTagName('input')
    const formInputs = document.querySelectorAll("input");
    console.log(formInputs)
    const data: Record<string, string> = {};
    formInputs.forEach((input: HTMLInputElement) => {
        (checkInputValue(input)) ? data[input.name] = input.value : ""
    });

    (formInputs.length == Object.keys(data).length) ? console.log(data) : ""



    


    

}


  