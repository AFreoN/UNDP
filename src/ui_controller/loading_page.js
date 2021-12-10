

const textItems = {
    title : {
        en : 'Circles of influence quiz',
        si : 'බලපෑම් කව ප්‍රශ්නාවලිය',
        ta : 'செல்வாக்கு வட்டங்கள் வினாடி வினா',
        dv : 'Circles of influence quiz (Divehi)'
    },
    footer : {
        en : 'ExtremeLives is a project by <strong>UNDP</strong> and the <strong>EU</strong>',
        si : 'ExtremeLives යනු <strong>UNDP</strong> සහ <strong>EU</strong> හි ව්‍යාපෘතියකි',
        ta : 'எக்ஸ்ட்ரீம் லைவ்ஸ் என்பது <strong>UNDP</strong> மற்றும் <strong>EU</strong> ஆகியவற்றின் திட்டமாகும்',
        dv : 'ExtremeLives is a project by <strong>UNDP</strong> and the <strong>EU</strong>'
    },
    startButton : {
        en : "Let's Go",
        si : 'යන්න පුළුවන්',
        ta : 'போகலாம்',
        dv : "Let's Go"
    },
    privacy : {
        en : 'Privacy Policy',
        si : 'රහස්යතා ප්රතිපත්තිය',
        ta : 'தனியுரிமைக் கொள்கை',
        dv : 'Privacy Policy'
    },
    selectLanuage : {
        en : 'Select Language',
        si : 'භාෂාව තෝරන්න',
        ta : 'மொழியை தேர்ந்தெடுங்கள்',
        dv : 'Select Language'
    },
    langSelectFooter : {
        en : 'Circles of influence quiz',
        si : 'බලපෑම් කව ප්‍රශ්නාවලිය',
        ta : 'செல்வாக்கு வட்டங்கள் வினாடி வினா',
        dv : 'Circles of influence quiz (Divehi)'
    },
    next : {
        en : 'Next',
        si : 'ඊළඟ',
        ta : 'அடுத்தது',
        dv : 'Next'
    }
}

const la = navigator.language || navigator.userLanguage

const titleText = document.getElementById('loading-title')
const footerText = document.getElementById('loading-footer-text')
const startButtonText = document.getElementById('survey-start-button')
const privacyText = document.getElementById('loading-footer-privacy-policy')

const selectLanguageText = document.getElementById('select-language-text')
const langSelectFooterText = document.getElementById('lang-bottom-text')
const nextText = document.getElementById('language-selected-button')

export function initializeLoadingPage(){
    
    if(la == 'si' || la == 'sin'){
        titleText.innerText = textItems.title.si
        footerText.innerHTML = textItems.footer.si
        startButtonText.innerText = textItems.startButton.si
        privacyText.innerText = textItems.privacy.si

        selectLanguageText.innerText = textItems.selectLanuage.si
        langSelectFooterText.innerText = textItems.langSelectFooter.si
        nextText.innerText = textItems.next.si
    }
    else if(la == 'ta' || la == 'tam'){
        titleText.innerText = textItems.title.ta
        footerText.innerHTML = textItems.footer.ta
        startButtonText.innerText = textItems.startButton.ta
        privacyText.innerText = textItems.privacy.ta

        selectLanguageText.innerText = textItems.selectLanuage.ta
        langSelectFooterText.innerText = textItems.langSelectFooter.ta
        nextText.innerText = textItems.next.ta
    }
    else if(la == 'dv'){
        titleText.innerText = titleText.title.dv
        footerText.innerHTML = titleText.footer.dv
        startButtonText.innerText = titleText.startButton.dv
        privacyText.innerText = textItems.privacy.dv

        selectLanguageText.innerText = textItems.selectLanuage.dv
        langSelectFooterText.innerText = textItems.langSelectFooter.dv
        nextText.innerText = textItems.next.dv
    }
}
