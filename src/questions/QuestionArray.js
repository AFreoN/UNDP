export const Questions = [
    //#region Stage 1
    {   //1     Country
        type : 'country',
        question : {
            en : 'In which country do you live ?',
            si : 'ඔබ ජීවත් වන්නේ කුමන රටේද?',
            ta : 'நீங்கள் எந்த நாட்டில் வாழ்கிறீர்கள் ?',
            dv : 'In which country do you live ?'
        },
        compulsory : true
    },
    {   //2     Province
        type : 'province',
        question : {
            en : 'In which area do you live ?',
            si : 'ඔබ ජීවත් වන්නේ කුමන ප්‍රදේශයේද?',
            ta : 'நீங்கள் எந்த பகுதியில் வசிக்கிறீர்கள் ?',
            dv : 'In which area do you live ?'
        },
        compulsory : false
    },
    {   //3     About
        type : 'about',
        question : {
            main:{
                en : 'About you',
                si : 'ඔයාගේ වයස කීය ද ?',
                ta : 'உங்களுக்கு எவ்வளவு வயது ?',
                dv : 'How old are you ?'
            },
            age:{
                en : 'How old are you ?',
                si : 'ඔයාගේ වයස කීය ද ?',
                ta : 'உங்களுக்கு எவ்வளவு வயது ?',
                dv : 'How old are you ?'
            },
            gender:{
                en : 'What is your gender ?',
                si : 'ඔබේ ලිංගය කුමක්ද?',
                ta : 'உங்கள் பாலினம் என்ன ?',
                dv : 'What is your gender ?'
            }
        },
        answers :{
            age:[
                {
                    en : 'Under 18',
                    si : '18 ට අඩු',
                    ta : '18 வயதுக்குட்பட்டவர்',
                    dv : 'Under 18'
                },
                {
                    en : '18-25',
                    si : '18-25',
                    ta : '18-25',
                    dv : '18-25'
                },
                {
                    en : '26-35',
                    si : '26-35',
                    ta : '26-35',
                    dv : '26-35'
                },
                {
                    en : '35+',
                    si : '35+',
                    ta : '35+',
                    dv : '35'
                },
                {
                    en : 'Prefer not to Say',
                    si : 'නොකියන්න කැමති',
                    ta : 'சொல்ல விரும்பவில்லை',
                    dv : 'Prefer not to Say'
                }
            ], 
            gender:[
                {
                    en : 'Man',
                    si : 'මිනිසා',
                    ta : 'ஆண்',
                    dv : 'Man'
                },
                {
                    en : 'Woman',
                    si : 'කාන්තාවක්',
                    ta : 'பெண்',
                    dv : 'Woman'
                },
                {
                    en : 'Intersex',
                    si : 'අන්තර් ලිංගික',
                    ta : 'இருபால்',
                    dv : 'Intersex'
                },
                {
                    en : 'Non-binary',
                    si : 'ද්විමය නොවන',
                    ta : 'ஒரு பாலினம் அல்ல',
                    dv : 'Non-binary'
                },
                {
                    en : 'Other',
                    si : 'වෙනත්',
                    ta : 'மற்றவை',
                    dv : 'Other'
                },
                {
                    en : 'Prefer not to Say',
                    si : 'නොකියන්න කැමති',
                    ta : 'சொல்ல விரும்பவில்லை',
                    dv : 'Prefer not to Say'
                }
            ]
        },
        compulsory : false
    },
    {   //1     Mother
        type : 'joystick',
        question : {
            en : 'How close do you feel to your mother ?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How close do you feel to your mother ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'mother',
        characterName: {
            en : 'Mother',
            si : 'මව',
            ta : 'அம்மா',
            dv : 'Mother'
        },
        compulsory: true
    },
    {   //2     Father
        type : 'joystick',
        question : {
            en : 'How close do you feel to your father ?',
            si : 'ඔබ ඔබේ පියාට කොතරම් සමීපද?',
            ta : 'உங்கள் தந்தையிடம் நீங்கள் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How close do you feel to your father ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'father',
        characterName:{
            en : 'Father',
            si : 'පියා',
            ta : 'தந்தை',
            dv : 'Father'
        },
        compulsory: true
    },
    {   //3     Siblings
        type : 'joystick',
        question : {
            en : 'How close are you to your siblings?',
            si : 'ඔබ සහෝදර සහෝදරියන් සමඟ කෙතරම් සමීපද?',
            ta : 'நீங்கள் உடன்பிறந்தவர்களுடன் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'How close are you to your siblings?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'siblings',
        characterName:{
            en : 'Siblings',
            si : 'සහෝදර සහෝදරියන්',
            ta : 'உடன்பிறந்தவர்கள்',
            dv : 'Siblings'
        },
        compulsory: true
    },
    {   //4     Closest Friends
        type : 'joystick',
        question : {
            en : 'How close are you to your closest friends?',
            si : 'ඔබේ සමීපතම මිතුරන්ට ඔබ කෙතරම් සමීපද?',
            ta : 'உங்கள் நெருங்கிய நண்பர்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'How close are you to your closest friends?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'friends',
        characterName:{
            en : 'Closest Friends',
            si : 'සමීපතම මිතුරන්',
            ta : 'நெருங்கிய நண்பர்கள்',
            dv : 'Closest Friends'
        },
        compulsory: true
    },
    {   //5     Distant Friends
        type : 'joystick',
        question : {
            en : 'How close are you to your distant friends?',
            si : 'ඔබේ දුරස්ථ මිතුරන්ට ඔබ කෙතරම් සමීපද?',
            ta : 'உங்கள் தொலைதூர நண்பர்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'How close are you to your distant friends?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'distantFriend',       //distantFriend
        characterName:{
            en : 'Distant Friends',
            si : 'දුරස්ථ මිතුරන්',
            ta : 'தொலைதூர நண்பர்கள்',
            dv : 'Distant Friends'
        },
        compulsory: true
    },
    {   //6     Local Community
        type : 'joystick',
        question : {
            en : 'How close do you feel with your local community ?',
            si : 'ඔබේ ප්‍රාදේශීය ප්‍රජාව සමඟ ඔබට කෙතරම් සමීප බවක් දැනෙන්නේද?',
            ta : 'உங்கள் உள்ளூர் சமூகத்துடன் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'How close do you feel with your local community ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'community',
        characterName:{
            en : 'Community',
            si : 'ප්රජාව',
            ta : 'சமூகம்',
            dv : 'Community'
        },
        compulsory: true
    },
    {   //7     Local Religious community
        type : 'joystick',
        question : {
            en : 'How close do you feel to your local religious community ?',
            si : 'වෙනත් භාෂාවක් කතා කරන පුද්ගලයින්ට ඔබට කෙතරම් සමීප බවක් දැනෙන්නේද?',
            ta : 'உங்கள் உள்ளூர் சமூகத்துடன் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'How close do you feel with your local community ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'temples',
        characterName:{
            en : 'Religious Community',
            si : 'ප්රජාව',
            ta : 'சமூகம்',
            dv : 'Community'
        },
        compulsory: true
    },
    {   //8     Speak a Different language
        type : 'joystick',
        question : {
            en : 'How close do you feel to people that speak a different language ?',
            si : 'වෙනත් භාෂාවක් කතා කරන පුද්ගලයින්ට ඔබට කෙතරම් සමීප බවක් දැනෙන්නේද?',
            ta : 'உங்கள் உள்ளூர் சமூகத்துடன் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'How close do you feel with your local community ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'dif_language',
        characterName:{
            en : 'Different Language',
            si : 'ප්රජාව',
            ta : 'சமூகம்',
            dv : 'Community'
        },
        compulsory: true
    },
    {   //9     Different religious and beliefs
        type : 'joystick',
        question : {
            en : 'How close do you feel to people with different religious beliefs ?',
            si : 'වෙනත් භාෂාවක් කතා කරන පුද්ගලයින්ට ඔබට කෙතරම් සමීප බවක් දැනෙන්නේද?',
            ta : 'உங்கள் உள்ளூர் சமூகத்துடன் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'How close do you feel with your local community ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'religious_belief',
        characterName:{
            en : 'Different Religions',
            si : 'ප්රජාව',
            ta : 'சமூகம்',
            dv : 'Community'
        },
        compulsory: true
    },
    {   //10    Home Country
        type : 'joystick',
        question : {
            en : 'How close do you feel to your home country ?',
            si : 'වෙනත් භාෂාවක් කතා කරන පුද්ගලයින්ට ඔබට කෙතරම් සමීප බවක් දැනෙන්නේද?',
            ta : 'உங்கள் உள்ளூர் சமூகத்துடன் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'How close do you feel with your local community ?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            },
            {
                en : 'answer6',
                si : 'පිළිතුර6',
                ta : 'பதில்6',
                dv : 'answer6'
            },
            {
                en : 'answer7',
                si : 'පිළිතුර7',
                ta : 'பதில்7',
                dv : 'answer7'
            }
        ],
        centerModelKey:'home_country',
        characterName:{
            en : 'Home Country',
            si : 'ප්රජාව',
            ta : 'சமூகம்',
            dv : 'Community'
        },
        compulsory: true
    },
//#endregion
    //#region Stage 2
    {   //1    Feel close to your friends
        type : 'likert5',
        question : {
            en : 'Do you feel close to your friends(not including those in your family)? ',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Extremely Close',
                si : 'Extremely Close',
                ta : 'மிக நெருக்கமானது',
                dv : 'Extremely Close'
            },
            negativeTwo : {
                en : 'Not at all close',
                si : 'Not at all close',
                ta : 'நெருங்கவே இல்லை',
                dv : 'Not at all close'
            }
        },
        compulsory: true
    },
    {   //2    Easy to find people to socialize with
        type : 'likert5',
        question : {
            en : 'If you feel like having company, do you find it easy to find people to socialize with?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Extremely easy',
                si : 'Extremely easy',
                ta : 'மிகவும் எளிதானது',
                dv : 'Extremely easy'
            },
            negativeTwo : {
                en : 'Not at all easy',
                si : 'Not at all easy',
                ta : 'எளிதல்ல',
                dv : 'Not at all easy'
            }
        },
        compulsory: true
    },
    {   //3    Easy to make friends
        type : 'likert5',
        question : {
            en : 'Do you find it easy to make new friends?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Extremely easy',
                si : 'Extremely easy',
                ta : 'மிகவும் எளிதானது',
                dv : 'Extremely easy'
            },
            negativeTwo : {
                en : 'Not at all easy',
                si : 'Not at all easy',
                ta : 'எளிதல்ல',
                dv : 'Not at all easy'
            }
        },
        compulsory: true
    },
    {   //4    Well supported by people you know
        type : 'likert5',
        question : {
            en : 'Do you feel well supported by the people you know?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Extremely well-supported',
                si : 'Extremely well-supported',
                ta : 'Extremely well-supported',
                dv : 'Extremely well-supported'
            },
            negativeTwo : {
                en : 'Not at all well-supported',
                si : 'Not at all well-supported',
                ta : 'Not at all well-supported',
                dv : 'Not at all well-supported'
            }
        },
        compulsory: true
    },
    {   //5    Happy last month
        type : 'likert5',
        question : {
            en : 'How happy have you been over the last month?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Very happy',
                si : 'Very happy',
                ta : 'Very happy',
                dv : 'Very happy'
            },
            negativeTwo : {
                en : ' Very unhappy',
                si : ' Very unhappy',
                ta : ' Very unhappy',
                dv : ' Very unhappy'
            }
        },
        compulsory: true
    },
    {   //6    feel a sense of belonging in my local community
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement ‘I feel a sense of belonging in my local community’?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Strongly agree',
                si : 'Strongly agree',
                ta : 'Strongly agree',
                dv : 'Strongly agree'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'Strongly disagree',
                ta : 'Strongly disagree',
                dv : 'Strongly disagree'
            }
        },
        compulsory: true
    },
    {   //7    Trusted or can't be too careful
        type : 'likert4',
        question : {
            en : 'Do you think that, in general, most people can be trusted, or that you can’t be too careful in dealing with people?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            value1 : {
                en : 'Most people can be trusted',
                si : 'Most people can be trusted',
                ta : 'Most people can be trusted',
                dv : 'Most people can be trusted'
            },
            value2 : {
                en : 'You can’t be too careful',
                si : 'You can’t be too careful',
                ta : 'You can’t be too careful',
                dv : 'You can’t be too careful'
            },
            value3 : {
                en : 'It depends',
                si : 'It depends',
                ta : 'It depends',
                dv : 'It depends'
            },
            value4 : {
                en : 'Don’t know',
                si : 'Don’t know',
                ta : 'Don’t know',
                dv : 'Don’t know'
            }
        },
        compulsory: true
    },
    {   //8    People have the best intentions
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement ‘I assume that people have the best intentions’?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Strongly agree',
                si : 'Strongly agree',
                ta : 'Strongly agree',
                dv : 'Strongly agree'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'Strongly disagree',
                ta : 'Strongly disagree',
                dv : 'Strongly disagree'
            }
        },
        compulsory: true
    },
    {   //9    Neighbourhood can be trusted
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement ‘most people in my home neighbourhood can be trusted’?(Home neighbourhood means 15-20 minutes walking distance from where you currently live.)',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Strongly agree',
                si : 'Strongly agree',
                ta : 'Strongly agree',
                dv : 'Strongly agree'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'Strongly disagree',
                ta : 'Strongly disagree',
                dv : 'Strongly disagree'
            }
        },
        compulsory: true
    },
    {   //10   Generally Neighbourhood can be trusted
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement ‘most people in my home neighbourhood generally can be trusted?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Strongly agree',
                si : 'Strongly agree',
                ta : 'Strongly agree',
                dv : 'Strongly agree'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'Strongly disagree',
                ta : 'Strongly disagree',
                dv : 'Strongly disagree'
            }
        },
        compulsory: true
    },
    {   //11   Feel safe where I currently live
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement ‘I feel safe where I currently live’?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            positiveTwo : {
                en : 'Strongly agree',
                si : 'Strongly agree',
                ta : 'Strongly agree',
                dv : 'Strongly agree'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'Strongly disagree',
                ta : 'Strongly disagree',
                dv : 'Strongly disagree'
            }
        },
        compulsory: true
    },
    {   //12   Talk to each day on phone/internet
        type : 'likert4',
        question : {
            en : 'How many people do you typically talk to each day on the phone/internet?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            value1 : {
                en : '0',
                si : '0',
                ta : '0',
                dv : '0'
            },
            value2 : {
                en : '1-3',
                si : '1-3',
                ta : '1-3',
                dv : '1-3'
            },
            value3 : {
                en : '4-6',
                si : '4-6',
                ta : '4-6',
                dv : '4-6'
            },
            value4 : {
                en : '7+',
                si : '7+',
                ta : '7+',
                dv : '7+'
            }
        },
        compulsory: true
    },
    {   //13   How many people can you go to for help
        type : 'likert4',
        question : {
            en : 'When in need, how many people can you go to for help (e.g.practical, relationships, emotional,financial, etc.)?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            value1 : {
                en : '0',
                si : '0',
                ta : '0',
                dv : '0'
            },
            value2 : {
                en : '1-3',
                si : '1-3',
                ta : '1-3',
                dv : '1-3'
            },
            value3 : {
                en : '4-6',
                si : '4-6',
                ta : '4-6',
                dv : '4-6'
            },
            value4 : {
                en : '7+',
                si : '7+',
                ta : '7+',
                dv : '7+'
            }
        },
        compulsory: true
    },
    {   //14   How many people you call on to socialize
        type : 'likert4',
        question : {
            en : 'How many people can you typically call on if you want to socialize?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            value1 : {
                en : '0',
                si : '0',
                ta : '0',
                dv : '0'
            },
            value2 : {
                en : '1-3',
                si : '1-3',
                ta : '1-3',
                dv : '1-3'
            },
            value3 : {
                en : '4-6',
                si : '4-6',
                ta : '4-6',
                dv : '4-6'
            },
            value4 : {
                en : '7+',
                si : '7+',
                ta : '7+',
                dv : '7+'
            }
        },
        compulsory: true
    },
    {   //15   How many people you call on in emergency
        type : 'likert4',
        question : {
            en : 'How many people do you know who you can call on in an emergency?',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'How happy have you been over the last month?'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        options : {
            value1 : {
                en : '0',
                si : '0',
                ta : '0',
                dv : '0'
            },
            value2 : {
                en : '1-3',
                si : '1-3',
                ta : '1-3',
                dv : '1-3'
            },
            value3 : {
                en : '4-6',
                si : '4-6',
                ta : '4-6',
                dv : '4-6'
            },
            value4 : {
                en : '7+',
                si : '7+',
                ta : '7+',
                dv : '7+'
            }
        },
        compulsory: true
    },
//#endregion
    //#region Stage 3
    {   //1    Control over things happen to me
        type : 'likert7',
        question : {
            en : 'I have little control over the things that happen to me',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //2    No way I can solve problems
        type : 'likert7',
        question : {
            en : 'There is really no way I can solve some of the problems I have',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //3    Little I can do to change important things in my life
        type : 'likert7',
        question : {
            en : 'There is little I can do to change many of the important things in my life',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //4    Feel helpless in dealing with problems of life
        type : 'likert7',
        question : {
            en : 'I often feel helpless in dealing with the problems of life',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //5    Being pushed around in life
        type : 'likert7',
        question : {
            en : 'Sometimes I feel that I’m being pushed around in life',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //6    What happens to me in the future mostly depends on me
        type : 'likert7',
        question : {
            en : 'What happens to me in the future mostly depends on me',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //7    Do anything I set my mind to do
        type : 'likert7',
        question : {
            en : 'I can do just about anything I really set my mind to do',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //8    Friends talk about problems and issues they face
        type : 'likert7',
        question : {
            en : 'People in my circle of friends are able to talk about problems and tough issues that they face',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //9    Take a risk in circle of friends
        type : 'likert7',
        question : {
            en : 'I feel safe to take a risk in my circle of friends',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //10   Difficult to ask my circle of friends for help
        type : 'likert7',
        question : {
            en : 'It is difficult to ask my circle of friends for help',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //11   No one in cicle of friends act to hurt my study or work
        type : 'likert7',
        question : {
            en : 'No one in my circle of friends would intentionally act in a way to hurt my study or work',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //12   Skills and talents are valued and utilized
        type : 'likert7',
        question : {
            en : 'Within my circle of friends, my unique skills and talents are valued and utilized',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //13   Mistake held against me by my circle of friends
        type : 'likert7',
        question : {
            en : 'If I make a mistake, it is often held against me by my circle of friends',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    },
    {   //14   Friends reject others for being different
        type : 'likert7',
        question : {
            en : 'People in my circle of friends sometimes reject others for being different',
            si : 'ඔබ ඔබේ මවට කොතරම් සමීපද?',
            ta : 'உங்கள் தாயிடம் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள் ?',
            dv : 'I have little control over things that happen to me.'
        },
        answers : [
            {
                en : 'answer1',
                si : 'පිළිතුර1',
                ta : 'பதில்1',
                dv : 'answer1'
            },
            {
                en : 'answer2',
                si : 'පිළිතුර2',
                ta : 'பதில்2',
                dv : 'answer2'
            },
            {
                en : 'answer3',
                si : 'පිළිතුර3',
                ta : 'பதில்3',
                dv : 'answer3'
            },
            {
                en : 'answer4',
                si : 'පිළිතුර4',
                ta : 'பதில்4',
                dv : 'answer4'
            },
            {
                en : 'answer5',
                si : 'පිළිතුර5',
                ta : 'பதில்5',
                dv : 'answer5'
            }
        ],
        compulsory: true
    }
    //#endregion
]