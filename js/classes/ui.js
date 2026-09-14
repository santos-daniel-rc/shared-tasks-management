export class tButton extends HTMLElement{
    constructor(options = {}){
        let instance = document.createElement('button')
        instance.classList.add("tButton");
        

        if (typeof options.content === "string")
            instance.innerHTML = options.content;
        else
            instance.appendChild(options.content);

        if (options.main)
            instance.classList.add('main');
        if (options.form_submit)
            instance.type = 'submit';
        if (!!options.name)
            instance.name = options.name;

        if (!!options.classes){
            if (typeof options.classes === "string")
                instance.classList.add(options.classes);
            else for (let subclass of options.classes){
                instance.classList.add(subclass);
            }
        }

        if (!!options.onclick)
            instance.addEventListener('click', options.onclick);

        return instance;
    }
}

export class tRadioGroup extends HTMLElement{
    constructor(options = {source: {}}, ...choices){
        let instance = document.createElement('div');
        instance.classList.add("tRadioGroup");

        if (!!options.classes){
            if (typeof options.classes === "string")
                instance.classList.add(options.classes);
            else for (let subclass of options.classes){
                instance.classList.add(subclass);
            }
        }

        tRadioGroup.buildChoices(choices).forEach(function(choice){
            let choice_wrapper = document.createElement('div');
            choice_wrapper.classList.add('tRadio');

            let input = document.createElement('input');
            input.type = 'radio';
            input.name = options.name;
            input.setAttribute('value', choice.value);
            choice_wrapper.appendChild(input);
            
            if (!!choice.content)
                if (typeof choice.content !== "string")
                    choice_wrapper.appendChild(choice.content);
                else {
                    let span = document.createElement('span');
                    span.innerHTML = choice.content;
                    choice_wrapper.appendChild(span);
                }
            
            input.addEventListener('change', function(e){
                options.source[options.name] = choice.value;
                if (!!options.onchange)
                    options.onchange();
            });

            instance.appendChild(choice_wrapper);
        });

        return instance
    }

    static buildChoices(...args){
        let choices = [];
        for (let i=0; i+1<args.length; i+=2){
            if (typeof args[i+1] !== "string")
                return [];
            choices.push({
                content: args[i],
                value: args[i+1]
            });

        }
        return choices;
    }
}

export class tOptions extends HTMLElement{
    constructor(options = {source: {}}, ...choices){
        let instance = document.createElement('div');
        instance.classList.add('tOptions');
        if (!!options.classes){
            if (typeof options.classes === "string")
                instance.classList.add(options.classes);
            else for (let subclass of options.classes){
                instance.classList.add(subclass);
            }
        }

        tOptions.buildChoices(choices).forEach(function(choice){
            let choice_wrapper = document.createElement('div');
            choice_wrapper.classList.add('tOption');

            let input = document.createElement('input');
            input.type = 'checkbox';
            input.name = choice.data_tag;
            choice_wrapper.appendChild(input);

            if (!!choice.content)
                if (typeof choice.content !== "string")
                    choice_wrapper.appendChild(choice.content);
                else {
                    let span = document.createElement('span');
                    span.innerHTML = choice.content;
                    choice_wrapper.appendChild(span);
                }

            input.addEventListener('change', function(e){
                options.source[choice.data_tag] = e.target.checked;
                if (!!options.onchange)
                    options.onchange();
            });
            
            instance.appendChild(choice_wrapper);
        });

        return instance;
    }

    static buildChoices(...args){
        let choices = [];
        for (let i=0; i+1<args.length; i+=2){
            if (typeof args[i+1] !== "string")
                return [];
            choices.push({
                content: args[i],
                data_tag: args[i+1]
            });

        }
        return choices;
    }
}

export class tCombobox extends HTMLElement{
    constructor (options = {}, ...choices){
        let instance = document.createElement('div');
        instance.classList.add('tCombobox');

        let input = document.createElement('input');
        input.setAttribute('list', options.list_name);

        let data_list = document.createElement('datalist');
        data_list.name = options.list_name

        let dropdown = document.createElement('select');
        let dropdown_options = [];
        dropdown.name = options.name;

        tCombobox.buildChoices(choices).forEach(function(choice){
            data_list.appendChild(tCombobox.buildOptionTag(choice.value));

            let dropdown_option = tCombobox.buildOptionTag(choice.text, choice.value);
            dropdown.appendChild(dropdown_option);
            dropdown_options.push(dropdown_option);
        });

        instance.appendChild(input);
        instance.appendChild(data_list);
        instance.appendChild(dropdown);

        input.addEventListener('change', function(e){
            let selected_val = e.target.value;
            let dropdown_option = dropdown_options.find(option => option.text == selected_val);
            dropdown.value = dropdown_option ? dropdown_option.value : null;
            dropdown.dispatchEvent(new Event('change', {bubbles: true}));
        });

        if (!!options.change)
            dropdown.addEventListener('change', options.change);

        return instance;

    }

    static buildOptionTag(text, value){
        let option = document.createElement('option');
        option.setAttribute('value', text);
        if (!!value){
            option.text = text;
            option.setAttribute('value', value);
        }
        return option;
    }
    
    static buildChoices(...args){
        let choices = [];
        for (let i=0; i+1<args.length; i+=2){
            if (typeof args[i+1] !== "string")
                return [];
            choices.push({
                value: args[i],
                text: args[i+1]
            });

        }
        return choices;
    }
}