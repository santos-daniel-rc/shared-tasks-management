import {tButton, tRadioGroup, tOptions, tCombobox} from "./classes/ui.js";

document.body.appendChild(new tButton({
    content: "test",
    main: true,
    onclick: function(e) {console.log('click');}
}))
