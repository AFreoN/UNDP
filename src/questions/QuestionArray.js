export const Questions = [

    {   //~     1   Country
        type : 'country',
        question : {
            en : 'In which <span class="highlightText">country</span> do you live?',
            si : 'ඔබ ජීවත් වන්නේ කුමන රටේද?',
            ta : 'நீங்கள் எந்த நாட்டில் வாழ்கிறீர்கள்?',
            dv : 'ތިބާ ދިރިއުޅެނީ ކޮން ޤައުމެއްގައި ހެއްޔެވެ؟'
        },
        compulsory : true
    },
    {   //~     2   Province
        type : 'province',
        question : {
            en : 'In which <span class="highlightText">area</span> do you live?',
            si : 'ඔබ ජීවත් වන්නේ කුමන ප්‍රදේශයේද?',
            ta : 'நீங்கள் எந்த பகுதியில் வசிக்கிறீர்கள்?',
            dv : 'ތިބާ ދިރިއުޅެނީ ކޮން ހިސާބެއްގައި؟'
        },
        compulsory : false
    },
    {   //~     3   About
        type : 'about',
        question : {
            main:{
                en : 'About you',
                si : 'ඔබ ගැන',
                //translations need to be added  extra not on doc
                ta : 'உங்களைப் பற்றி?',
                dv : 'ތިބާއާމެދެ'
            },
            age:{
                en : 'Age',
                si : 'වයස',
                ta : 'வயது',                  
                dv : 'ޢުމުރު'
            },
            gender:{
                en : 'Gender',
                si : 'ස්ත්රී පුරුෂ භාවය',
                ta : 'பாலினம்',
                dv : 'ޖިންސު'
            }
        },
        answers :{
            age:[
                {
                    en : 'Under 18',
                    si : '18ට අඩු',
                    ta : '18 வயதிற்கு கீழ்',
                    dv : '18 އަހަރުން ދަށް'
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
                    dv : '35+'
                },
                {
                    en : 'Prefer not to Say',
                    si : 'කීමට අකැමැතියි',
                    ta : 'குறிப்பிட விரும்பவில்லை',
                    dv : 'ބޮޑަށް ބޭނުންވަނީ ހާމަނުކުރަން'
                }
            ], 
            gender:[
                {
                    en : 'Man',
                    si : 'පිරිමි',
                    ta : 'ஆண்',
                    dv : 'ފިރިހެން'
                },
                {
                    en : 'Woman',
                    si : 'කාන්තා',
                    ta : 'பெண்',
                    dv : 'އަންހެން'
                },
                {
                    en : 'Intersex',
                    si : 'අන්තර් ලිංගික',
                    ta : 'இடைப்பாலினம்',
                    dv : 'އިންޓަރސެކްސް'
                },
                {
                    en : 'Non-binary',
                    si : 'ද්වි නොවන',
                    ta : 'மாற்றுப்பாலினம் (binary)',
                    dv : 'ނޮން-ބައިނަރީ'
                },
                {
                    en : 'Other',
                    si : 'වෙනත්',
                    ta : 'வேறு',
                    dv : 'އެހެނިހެން'
                },
                {
                    en : 'Prefer not to Say',
                    si : 'කීමට අකැමැතියි',
                    ta : 'குறிப்பிட விரும்பவில்லை',
                    dv : 'ބޭނުންވަނީ ހާމަނުކުރަން'
                }
            ]
        },
        compulsory : false
    },
    //#region Stage 1
    {   //1     4   Mother
        type : 'joystick',
        question : {
            en : 'How close do you feel to your <span class="highlightText">mother</span>?',
            si : 'ඔබ ඔබගේ මව සමග කෙතරම් දුරට සමීපද?',
            ta : 'உங்கள் தாயுடன் நீங்கள் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'ތިބާގެ މަންމައާ ތިބާއާ މެދު އޮންނަނީ ކިހާ ގާތް ގުޅުމެއް؟'
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
            ta : 'தாய்',
            dv : 'އަހަރެން'
        },
        compulsory: true
    },
    {   //2     5   Father
        type : 'joystick',
        question : {
            en : 'How close do you feel to your <span class="highlightText">father</span>?',
            si : 'ඔබ ඔබගේ පියා සමග කෙතරම් දුරට සමීපද?',
            ta : 'நீங்கள் உங்கள் தந்தையுடன் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'ތިބާގެ ބައްޕައާ ތިބާއާ މެދު އޮންނަނީ ކިހާ ގާތް ގުޅުމެއް؟'
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
            en : 'father',
            si : 'පියා',
            ta : 'தந்தை',
            dv : 'ތިބާއާމެދެ'
        },
        compulsory: true
    },
    {   //3     6   Siblings
        type : 'joystick',
        question : {
            en : 'How close are you to your <span class="highlightText">siblings</span>?',
            si : 'ඔබ ඔබගේ සහෝදර සහෝදරියන් සමග කෙතරම් දුරට සමීපද?',
            ta : 'உங்கள் உடன்பிறந்தவர்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'ތިބާގެ އެއްބަނޑު އެއްބަފާ ކުދިންނާ ތިބާއާ ދެމެދު އޮންނަނީ ކިހާ ގާތް ގުޅުމެއް؟'
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
            dv : 'އެއްބަނޑު އެއްބަފާ ކުދިން'
        },
        compulsory: true
    },
    {   //4     7   Closest Friends
        type : 'joystick',
        question : {
            en : 'How close are you to your <span class="highlightText">closest friends</span>?',
            si : 'ඔබ ඔබගේ සමීප මිතුරන් සමග කෙතරම් දුරට සමීපද?',
            ta : 'உங்கள் நெருங்கிய நண்பர்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'ތިބާގެ އެންމެ ގާތް ރަހުމަތްތެރިންނާއި ތިބާއާ ދެމެދު އޮންނަނީ ކިހާ ގާތް ގުޅުމެއް؟'
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
            si : 'සමීපතම මිතුරෝ',
            ta : 'நெருங்கிய நண்பர்கள்',
            dv : 'ގާތް ރަހުމަތްތެރިން'
        },
        compulsory: true
    },
    {   //5     8   Distant Friends
        type : 'joystick',
        question : {
            en : 'How close are you to your <span class="highlightText">distant friends</span>?',
            si : 'ඔබ ඔබගේ දුරස්ථ මිතුරන් සමග කෙතරම් දුරට සමීපද?',
            ta : 'உங்கள் தொலைதூர நண்பர்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக இருக்கிறீர்கள்?',
            dv : 'ތިބާގެ ދުރު ރަހުމަތްތެރިންނާއި ތިބާއާ ދެމެދު އޮންނަނީ ކިހާ ގާތް ގުޅުމެއް؟'
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
            si : 'දුරස්ථ මිතුරෝ',
            ta : 'தொலைதூர நண்பர்கள்',
            dv : 'ދުރު ރަހުމަތްތެރިން'
        },
        compulsory: true
    },
    {   //6     9   Local Community
        type : 'joystick',
        question : {
            en : 'How close do you feel with your <span class="highlightText">local community</span>?',
            si : 'ඔබ ඔබගේ ප්‍රදේශයේ ප්‍රජාව සමග කෙතරම් දුරට සමීප යයි හැඟේද?',
            ta : 'உங்கள் உள்ளூர் சமூகத்துடன் நீங்கள் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'ތިބާގެ މުޖުތަމައާ ދެމެދު ތިބާއަށް ކިހާ ގާތްކަމެއް އިހުސާސްކުރެވޭ؟'
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
            si : 'ප්‍රජාව',
            ta : 'சமூகம்',
            dv : 'މުޖުތަމައު'
        },
        compulsory: true
    },
    {   //7     10  Local Religious community
        type : 'joystick',
        question : {
            en : 'How close do you feel to your <span class="highlightText">local religious community</span>?',
            si : 'ඔබ ඔබගේ ප්‍රදේශයේ ආගමික ප්‍රජාව සමග කෙතරම් දුරට සමීප යය හැඟේද?',
            ta : 'உங்கள் உள்ளூர் மத சமூகத்துடன் நீங்கள் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'ތިބާގެ މުޖުތަމަގެ ދީނީ ޖަމާއަތްތަކާ ދެމެދު ތިބާއަށް ކިހާ ގާތްކަމެއް އިހުސާސްކުރެވޭ؟'
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
            si : 'ආගමික ප්‍රජාව',
            ta : 'மத ரீதியான சமூகம்',
            dv : 'ދީނީ މުޖުތަމައު'
        },
        compulsory: true
    },
    {   //8     11  Speak a Different language
        type : 'joystick',
        question : {
            en : 'How close do you feel to people that <span class="highlightText">speak a different language</span>?',
            si : 'ඔබ වෙනත් භාෂාවක් කතාකරන මිනිසුන් සමග කෙතරම් දුරට සමීප යය හැඟේද?',
            ta : 'வேறொரு மொழியைப் பேசும் மக்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'އެހެން ބަހަކުން ވާހަކަދައްކާ މީހުންނާމެދު ތިބާއަށް ކިހާ ގާތްކަމެއް އިހުސާސްކުރެވޭ؟'
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
            si : 'විවිධ භාෂා',
            ta : 'வேறு மொழி',
            dv : 'ތަފާތު ބަސްތައް'
        },
        compulsory: true
    },
    {   //9     12  Different religious and beliefs
        type : 'joystick',
        question : {
            en : 'How close do you feel to people with <span class="highlightText">different religious beliefs</span>?',
            si : 'ඔබ වෙනස් ආගම් හා විශ්වාසයන් සහිත ප්‍රජාවන් සමග කෙතරම් දුරට සමීප යයි හැඟේද?',
            ta : 'வெவ்வேறு மதம் மற்றும் நம்பிக்கைகளைக் கொண்டவர்களுடன் நீங்கள் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'އެހެން ދީންތަކާއި ގަބޫލުކުރުންތައް ގެންގުޅޭ މީހުންނާ ދެމެދު ތިބާއަށް ކިހާ ގާތްކަމެއް އިހުސާސްކުރެވޭ؟'
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
            si : 'විවිධ ආගම්',
            ta : 'வேறு மதங்கள்',
            dv : 'ތަފާތު ދީންތައް'
        },
        compulsory: true
    },
    {   //10    13  Home Country
        type : 'joystick',
        question : {
            en : 'How close do you feel to your <span class="highlightText">home country</span>?',
            si : 'ඔබ ඔබගේ මව්රටට කෙතරම් දුරට සමීප යයි හැඟේද?',
            ta : 'உங்கள் தாய்நாட்டுடன் எவ்வளவு நெருக்கமாக உணர்கிறீர்கள்?',
            dv : 'ތިބާގެ އުފަން ގައުމާމެދު ތިބާއަށް ކިހާ ގާތްކަމެއް އިހުސާސްކުރެވޭ؟'
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
            si : 'මාතෘ භූමිය',
            ta : 'தாய் நாடு',
            dv : 'އަމިއްލަ ޤައުމު'
        },
        compulsory: true
    },
//#endregion
    //#region Stage 2
    {   //1     14    Feel close to your friends
        type : 'likert5',
        question : {
            en : 'Do you feel close to your <span class="highlightText">friends</span> <span class="bracket-text-english">(not including those in your family)</span>?',
            si : 'ඔබ ඔබගේ මිතුරන් සමග සමීප යයි ඔබට හැඟේද? <span class="bracket-text-sinhala">(ඔබේ පවුලේ අය අදාළ නොවේ)</span>',
            ta : 'உங்கள் நண்பர்களுடன் நெருக்கமாக உணர்கிறீர்களா <span class="bracket-text-sinhala">(உங்கள் குடும்ப உறுப்பினர்கள் தவிர்ந்த)</span>?',
            dv : 'ތިބާގެ ރަހުމަތްތެރިންނާ ގާތްކަން އިހުސާސްކުރެވޭތަ؟ (އާއިލީ މެންބަރުން ނުހިމެނޭ ގޮތަށް)'
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
                si : 'ඉතාම සමීපයි',
                ta : 'மிக அதிகமான நெருக்கம்',
                dv : 'ވަރަށް ބޮޑަށް ގާތް'
            },
            negativeTwo : {
                en : 'Not at all close',
                si : 'කිසි සේත්ම සමීප නැත',
                ta : 'நெருக்கமில்லை',
                dv : 'އެއްވެސް މިންވަރަކަށް ގާތެއް ނޫން'
            }
        },
        compulsory: true
    },
    {   //2     15    Easy to find people to socialize with
        type : 'likert5',
        question : {
            en : 'If you feel like having company, do you find it <span class="highlightText">easy to find people to socialize with</span>?',
            si : 'ඔබ මිතුරු ඇසුරට කැමති නම්, සමාජගත වීම සඳහා පුද්ගලයන් සොයාගැනීම පහසු යයි ඔබට හැඟේද?',
            ta : 'நீங்கள் சகபாடிகளை கொண்டுள்ளதாக உணர்ந்தால் அவர்களுடன் பழகுவது இலகுவானதாக இருக்கின்றதா?',
            dv : 'ބަޔަކާ ބައްދަލުވެލަން ބޭނުންވުމުން، ގުޅުން ބަދަހިކޮށްލާނެ ބަޔަކު ހޯދަން ފަސޭހަކަމަށް އިހުސާސްވޭތަ؟'
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
                si : 'ඉතාම පහසුයි පහසුයි',
                ta : 'மிக அதிகளவில் இலகுவானது',
                dv : 'ވަރަށް ބޮޑަށް ފަސޭހަ'
            },
            negativeTwo : {
                en : 'Not at all easy',
                si : 'කිසි සේත්ම පහසු නැත',
                ta : 'கடினமானது',
                dv : 'އެއްވެސް މިންވަރަކަށް ފަސޭހައެއް ނޫން'
            }
        },
        compulsory: true
    },
    {   //3     16    Easy to make friends
        type : 'likert5',
        question : {
            en : 'Do you find it easy to <span class="highlightText">make new friends</span>?',
            si : 'අලුත් මිතුරන් සොයාගැනීම පහසු යයි ඔබට සිතේද?',
            ta : 'உங்களுக்கு புதிய நண்பர்களை உருவாக்குவது இலகுவாக இருக்கின்றதா?',
            dv : 'އައު ރަހުމަތްތެރިން ހޯދަން ތިބާއަށް ފަސޭހަތަ؟'
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
                si : 'ඉතාම පහසුයි',
                ta : 'மிக அதிகளவில் இலகுவானது',
                dv : 'ވަރަށް ބޮޑަށް ފަސޭހަ'
            },
            negativeTwo : {
                en : 'Not at all easy',
                si : 'ඉතාම පහසුයි',
                ta : 'கடினமானது',
                dv : 'އެއްވެސް މިންވަރަކަށް ފަސޭހައެއް ނޫން'
            }
        },
        compulsory: true
    },
    {   //4     17    Well supported by people you know
        type : 'likert5',
        question : {
            en : 'Do you feel <span class="highlightText">well supported by the people you know</span>?',
            si : 'ඔබ දන්නා අයගෙන් ඔබට මනා සහයෝගයක් ලැබේ යයි ඔබ සිතනවාද?',
            ta : 'உங்களுக்கு தெரிந்தவர்களால் நன்றாக ஆதரிக்கப்படுவதாக உணர்கின்றீர்களா?',
            dv : 'ދަންނަ މީހުންގެ ފަރާތުން އެއްބާރުލުން ލިބޭކަމުގެ އިހުސާސް ކުރެވޭތަ؟'
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
                si : 'ඉතාම',
                ta : 'மிக அதிகளவில்',
                dv : 'ވަރަށް ބޮޑަށް ކުރެވޭ'
            },
            negativeTwo : {
                en : 'Not at all well-supported',
                si : 'කිසි සේත්ම සහයෝගී නැත',
                ta : 'ஆதரிக்கப்படுவதேயில்லை',
                dv : 'އެއްގޮތަކަށްވެސް ނުކުރެވޭ'
            }
        },
        compulsory: true
    },
    {   //5     18    Happy last month
        type : 'likert5',
        question : {
            en : 'How <span class="highlightText">happy</span> have you been over the last month?',
            si : 'පසුගිය මාසය තුළ ඔබ කෙතරම් සතුටින් කාලය ගතකළාද?',
            ta : 'கடந்த மாதம் எந்தளவு மகிழ்ச்சியாக இருந்தீர்கள்?',
            dv : 'ވޭތުވެދިޔަ މަސްދުވަސް ތިބާއަށް އިހުސާސްކުރެވުނީ ކިހާ އުފާވެރިކޮށް؟'
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
                si : 'ඉතාම සතුටින්',
                ta : 'மிக்க மகிழ்ச்சி',
                dv : 'ވަރަށް އުފާވި'
            },
            negativeTwo : {
                en : ' Very unhappy',
                si : ' ඉතා අසතුටින් ',
                ta : ' மிக்க மகிழ்ச்சியின்மை',
                dv : ' އެއްވެސް މިންވަރަކަށް އުފަލެއް ނުވޭ'
            }
        },
        compulsory: true
    },
    {   //6     19    Feel a sense of belonging in my local community
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement <span class="highlightText">‘I feel a sense of belonging in my local community’</span>?',
            si : '‘මා මගේ ප්‍රජාවට අයත් යයි මට හැඟේ’ යන ප්‍රකාශය සමග ඔබ කොයි තරම් දුරට එකඟ වෙනවාද?',
            ta : '‘எனது உள்ளூர் சமூகத்தைச் சேர்ந்தவன் என்ற உணர்வை உணர்கிறேன்’ என்ற கூற்றை நீங்கள் எந்த அளவிற்கு ஏற்றுக்கொள்கிறீர்கள்?',
            dv : '[އަހަރެންގެ މުޖުއަމައާ ގުޅުން އޮތްކަމުގެ އިހުސާސް ކުރެވޭ] ކަމަށް ބުނާ ބުނުމާމެދު އެއްބަސްވަނީ ކިހާ މިންވަރަކަށް؟'
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
                si : 'දැඩිව එකඟයි',
                ta : 'உறுதியாக ஏற்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް އެއްބަސްވަން'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'දැඩිවම විරුද්ධයි',
                ta : 'உறுதியாக நிராகரிக்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް ދެބަސްވަން'
            }
        },
        compulsory: true
    },
    {   //7     20    Trusted or can't be too careful
        type : 'likert4',
        question : {
            en : 'Do you think that, in general, most people can be <span class="highlightText">trusted</span>, or that you <span class="highlightText">can\'t be too careful</span> in dealing with people?',
            si : 'සාමාන්‍යයෙන් ගත් කල බොහෝ මිනිසුන් විශ්වාස කළ හැකි යයි ඔබ සිතනවාද? නැතිනම්, මිනිසුන් සමග කටයුතු කිරීමේදී ඕනෑවට වඩා පරිස්සම් වීම අනවශ්‍ය යයි ඔබ සිතනවාද?',
            ta : 'பொதுவாக, பெரும்பாலான மக்களை நம்பலாம், அல்லது மக்களுடன் பழகுவதில் நீங்கள் மிகவும் கவனமாக இருக்க முடியாது என்று நினைக்கின்றீர்களா?',
            dv : 'އާންމުގޮތެއްގައި މީހުންނަށް އިތުބާރުކުރެވޭނެކަމަށް ގަބޫލުކުރަންތަ؟ ނޫނީ މީހުންނާ މުއާމަލާތްކުރާއިރު ވަރަށް ފަރުވާތެރި ވާންޖެހޭނެކަމަށް ގަބޫލުކުރަންތަ؟'
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
                si : 'බොහෝ මිනිසුන් විශ්වාස කළ හැකිය',
                ta : 'மிகவும் கவனமாக இருக்க',
                dv : 'ގިނަ މީހުންނަށް އިތުބާރުކުރެވޭނެ'
            },
            value2 : {
                en : 'You can’t be too careful',
                si : 'ඕනෑවට වඩා පරිස්සම් වීම අනවශ්‍යය',
                ta : 'முடியாது',
                dv : 'ވަރަށް ފަރުވާތެރި ވާންޖެހޭނެ'
            },
            value3 : {
                en : 'It depends',
                si : 'එය තීරණය වන්නේ තත්වය අනුවයි ',
                ta : 'இது நபர்களைப் பொறுத்தது',
                dv : 'ބައެއް ފަހަރު'
            },
            value4 : {
                en : 'Don’t know',
                si : 'නොදනිමි',
                ta : 'தெரியாது',
                dv : 'ނޭނގެ'
            }
        },
        compulsory: true
    },
    {   //8     21    People have the best intentions
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement <span class="highlightText">‘I assume that people have the best intentions’</span>?',
            si : '‘මිනිසුන්ගේ අභිලාෂයන් හොඳ යයි මම පිළිගනිමි’ යන ප්‍රකාශය සමග ඔබ කොයි තරම් දුරට එකඟ වෙනවාද?',
            ta : 'மக்களுக்கு சிறந்த நோக்கங்கள் இருப்பதாக நான் கருதுகிறேன் என்ற கூற்றை நீங்கள் எந்த அளவிற்கு ஏற்றுக்கொள்கிறீர்கள்?',
            dv : '[މީހުންގެ ރަނގަޅު ނިޔަތް އޮންނާނެކަމަށް ބެލެވޭ] މި ބުނުމާމެދު ތިބާ އެއްބަސްވަނީ ކިހާ މިންވަރަކަށް؟'
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
                si : 'දැඩිව එකඟයි',
                ta : 'உறுதியாக ஏற்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް އެއްބަސްވަން'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'දැඩිවම විරුද්ධයි',
                ta : 'உறுதியாக நிராகரிக்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް ދެބަސްވަން'
            }
        },
        compulsory: true
    },
    {   //9     22    Neighbourhood can be trusted
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement <span class="highlightText">‘most people in my home neighbourhood can be trusted’</span>? <span class="bracket-text-english">(Home neighbourhood means 15-20 minutes walking distance from where you currently live.)</span>',
            si : '‘මගේ නිවස ආසන්න ප්‍රදේශයේ අසල්වැසියන් වැඩිදෙනෙකු විශ්වාස කළ හැකිය’ යන ප්‍රකාශය සමග ඔබ කොයි තරම් දුරට එකඟද? <span class="bracket-text-sinhala">(නිවස ආසන්න ප්‍රදේශයේ අසල්වැසියන් යන්නෙන් අදහස් කරනු ලබන්නේ ඔබ වර්තමානයේ ජීවත්වන තැන සිට විනාඩි 15-20 අතර කාලයකින් යා හැකි දුරයි)</span>',
            ta : '‘எனது வீட்டு அயலிலுள்ள பெரும்பாலான மக்களை நம்பலாம்’ என்ற கூற்றை நீங்கள் எந்த அளவிற்கு ஏற்றுக்கொள்கிறீர்கள்? <span class="bracket-text-tamil">(வீட்டு அயல் என்பது நீங்கள் தற்போது வசிக்கும் இடத்திலிருந்து 15-20 நிமிட நடை தூரம் ஆகும்.</span>',
            dv : '[ގޭދޮށުގައި އުޅޭ ގިނަ މީހުންނަށް އިތުބާރުކުރެވޭނެ] ކަމަށް ބުނާ ބުނުމާމެދު ތިބާ އެއްބަސްވަނީ ކިހާ މިންވަރަކަށް؟ (ގޭދޮށު ކަމަށް ބުނެފައި އެވަނީ ތިބާ މިހާރު ދިރިއުޅޭ ތަނުން 15-20 މިނެޓުން ހިނގާފައި ދެވޭ ހިސާބަށް)'
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
                si : 'දැඩිව එකඟයි',
                ta : 'உறுதியாக ஏற்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް އެއްބަސްވަން'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'දැඩිවම විරුද්ධයි',
                ta : 'உறுதியாக நிராகரிக்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް ދެބަސްވަން'
            }
        },
        compulsory: true
    },
    {   //10    23    Generally Neighbourhood can be trusted
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement <span class="highlightText">‘most people in my home neighbourhood generally can be trusted</span>?',
            si : '‘මගේ නිවස ආසන්න ප්‍රදේශයේ අසල්වැසියන් වැඩිදෙනෙකු සාමාන්‍යයෙන් විශ්වාස කළ හැකිය’ යන ප්‍රකාශය සමග ඔබ කොයි තරම් දුරට එකඟද?',
            ta : '‘எனது வீட்டு அயலிலுள்ள பெரும்பாலான மக்களை பொதுவாக நம்பலாம்?’ என்ற கூற்றை நீங்கள் எந்த அளவிற்கு ஏற்றுக்கொள்கிறீர்கள்?',
            dv : '[ގޭދޮށުގައި އުޅޭ ގިނަ މީހުންނަށް އާންމު ގޮތެއްގައި އިތުބާރުކުރެވޭނެ] ކަމަށް ބުނާ ބުނުމާމެދު ތިބާ އެއްބަސްވަނީ ކިހާ މިންވަރަކަށް؟'
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
                si : 'දැඩිව එකඟයි',
                ta : 'உறுதியாக ஏற்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް އެއްބަސްވަން'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'දැඩිවම විරුද්ධයි',
                ta : 'உறுதியாக நிராகரிக்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް ދެބަސްވަން'
            }
        },
        compulsory: true
    },
    {   //11    24    Feel safe where I currently live
        type : 'likert5',
        question : {
            en : 'To what extent do you agree with the statement <span class="highlightText">‘I feel safe where I currently live’</span>?',
            si : '‘මා වර්තමානයේදී ජීවත්වන පරිසරය තුළ මට ආරක්ෂිත හැඟීමක් දැනේ’ යන ප්‍රකාශය සමග ඔබ කොයි තරම් දුරට එකඟද?',
            ta : '‘நான் தற்போது வசிக்கும் இடத்தில் பாதுகாப்பாக உணர்கிறேன்’ என்ற கூற்றை நீங்கள் எந்த அளவிற்கு ஏற்றுக்கொள்கிறீர்கள்?',
            dv : '[އަހަރެން މިހާރު ދިރިއުޅޭ ތަން ރައްކާތެރިކަމަށް އިހުސާސްކުރެވޭ] މި ބުނުމާމެދު ތިބާ އެއްބަސްވަނީ ކިހާ މިންވަރަކަށް؟'
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
                si : 'දැඩිව එකඟයි',
                ta : 'உறுதியாக ஏற்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް އެއްބަސްވަން'
            },
            negativeTwo : {
                en : 'Strongly disagree',
                si : 'දැඩිවම විරුද්ධයි',
                ta : 'உறுதியாக நிராகரிக்கின்றேன்',
                dv : 'ވަރަށް ބޮޑަށް ދެބަސްވަން'
            }
        },
        compulsory: true
    },
    {   //12    25    Talk to each day on phone/internet
        type : 'likert4',
        question : {
            en : 'How many people do you typically <span class="highlightText">talk to each day on the phone/internet</span>?',
            si : 'සෑම දිනකම සාමාන්‍යයෙන් ඔබ දුරකථනයෙන්/අන්තර්ජාලයෙන් පුද්ගලයන් කීදෙනෙකු සමග සාකච්ඡා කරනවාද?',
            ta : 'தொலைபேசி/இணையத்தில் ஒவ்வொரு நாளும் எத்தனை பேருடன் பொதுவாகப் பேசுவீர்கள்?',
            dv : 'ކޮންމެ ދުވަހަކު ފޯނު/އިންޓަރނެޓުން ތިބާ ވާހަކަ ދައްކަނީ ކިތައް މީހުންނާ؟'
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
    {   //13    26    How many people can you go to for help
        type : 'likert4',
        question : {
            en : 'When in need, <span class="highlightText">how many people can you go to for help</span> <span class="bracket-text-english">(e.g.practical, relationships, emotional,financial, etc.)?',
            si : 'ඔබට අවශ්‍ය විටදී, ඔබට පුද්ගලයන් කීදෙනෙකුගෙන් උපකාර ලබාගත හැකිද? <span class="bracket-text-sinhala">(උදා: ප්‍රායෝගික, සම්බන්ධතා,චිත්තවේගී, මූල්‍ය)</span>',
            ta : 'தேவைப்படும் போது, நீங்கள் எத்தனை பேரிடம் உதவிக்கு செல்லலாம் <span class="bracket-text-tamil">(உதா-நடைமுறை, உறவு, உணர்ச்சி, நிதி போன்றவை)?</span>',
            dv : 'ބޭނުމެއް ޖެހުމުން، އެހީއަށް އެދި ތިބާއަށް ދެވޭނީ ކިތައް މީހުން ގާތަށް؟ (މިސާލަކަށް: މާލީ، ދޭދޭ ގުޅުންތައް، އިހުސާސްތައް)'
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
    {   //14    27    How many people you call on to socialize
        type : 'likert4',
        question : {
            en : 'How many people can you typically call on if you want to <span class="highlightText">socialize</span>?',
            si : 'ඔබට සමාජගත වීමට අවශ්‍ය නම්, ඔබට සාමාන්‍යයෙන් පුද්ගලයන් කීදෙනෙකුට කතාකළ හැකිද?',
            ta : 'நீங்கள் பழக விரும்பினால் பொதுவாக எத்தனை பேரை அழைக்கலாம்?',
            dv : 'ގުޅުން ބަދަހިކުރަން ބޭނުންނަމަ ތިބާއަށް އާންމުކޮށް ގުޅާލެވޭނީ ކިތައް މީހުންނަށް؟'
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
    {   //15    28    How many people you call on in emergency
        type : 'likert4',
        question : {
            en : 'How many people do you know who you can call on in an <span class="highlightText">emergency</span>?',
            si : 'හදිසි අවස්ථාවකදී ඔබට කතා කළ හැකි පුද්ගලයන් කීදෙනෙකු ගැන ඔබ දන්නවාද?',
            ta : 'அவசரநிலைமையில் நீங்கள் அழைக்கலாம் என்று எத்தனை பேரை நீங்கள் அறிவீர்கள்?',
            dv : 'ކުއްލި ހާލަތެއް ދިމާވެއްޖެނަމަ ތިބާއަށް ގުޅާލެވޭނެ ކިތައް މީހުން ދަންނަންތަ؟'
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
    {   //1     29    Control over things happen to me
        type : 'likert7',
        question : {
            en : 'I have little <span class="highlightText">control</span> over the things that happen to me',
            si : 'මට සිදුවන දේ සම්බන්ධයෙන් මට තිබෙන්නේ අවම පාලනයකි.',
            ta : 'எனக்கு நடக்கும் விடயங்களில் எனக்கு சிறிதும் கட்டுப்பாடு இல்லை',
            dv : 'އަހަރެންނަށް ކުރިމަތިވާ ކަންކަމާމެދު އަހަރެންނަށް ބާރު ފޯރުވެނީ ވަރަށް ކުޑަކޮށް'
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
    {   //2     30    No way I can solve problems
        type : 'likert7',
        question : {
            en : 'There is really no way I can solve some of the <span class="highlightText">problems</span> I have',
            si : 'මට තිබෙන ඇතැම් ප්‍රශ්න විසඳාගැනීමට මට මාර්ගයක් නැත.',
            ta : 'எனக்கு இருக்கும் சில பிரச்சனைகளை என்னால் தீர்ப்பதற்கு எந்த வழியும் இல்லை',
            dv : 'އަހަރެންގެ ހުރި ބައެއް މައްސަލަތައް ހައްލުކުރެވޭނެ އެއްވެސް ގޮތެއް ނެތް'
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
    {   //3     31    Little I can do to change important things in my life
        type : 'likert7',
        question : {
            en : 'There is little I can do to change many of the <span class="highlightText">important things in my life</span>',
            si : 'මගේ ජීවිතයේ බොහෝ වැදගත් දේ වෙනස් කිරීමට මට කළ හැක්කේ අවම දෙයකි.',
            ta : 'என் வாழ்க்கையில் பல முக்கியமான விடயங்களை மாற்றுவதற்கு நான் செய்யக்கூடியது மிகக் குறைவு',
            dv : 'އަހަރެންގެ ހަޔާތުގައި ހުރި މުހިންމު ކަންކަން ބަދަލުކުރުމަށް އަހަރެންނަށް މާ ބޮޑު ކަމެއް ނުކުރެވޭނެ'
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
    {   //4     32    Feel helpless in dealing with problems of life
        type : 'likert7',
        question : {
            en : 'I often feel <span class="highlightText">helpless</span> in dealing with the problems of life',
            si : 'ජීවිතයේ ගැටලුවලට මුහුණදෙන විට මට බොහෝවිට අසරණ හැඟීමක් දැනේ.',
            ta : 'வாழ்க்கையின் பிரச்சினைகளைக் கையாள்வதில் நான் அடிக்கடி உதவியற்றவனாக உணர்கிறேன்',
            dv : 'ހަޔާތުގައި ދިމާވާ މައްސަލަތަކާ ކުރިމަތިލާއިރު ވަރަށް ގިނަފަހަރު އަހަރެންނަށް ގޮތް ހުސްވެއްޖެކަމުގެ އިހުސާސްކުރެވޭ '
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
    {   //5     33    Being pushed around in life
        type : 'likert7',
        question : {
            en : 'Sometimes I feel that I’m being <span class="highlightText">pushed around</span> in life',
            si : 'ඇතැම් විට මා ජීවිතයේ අතරමං වී ඇති බවක් දැනේ.',
            ta : 'சில நேரங்களில் நான் வாழ்க்கையில் தள்ளப்பட்டதாக உணர்கிறேன்',
            dv : 'ހަޔާތުގައި އަހަރެން އަމާޒެއްނެތި ދާހެން ބައެއްފަހަރު ހީވޭ'
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
    {   //6     34    What happens to me in the future mostly depends on me
        type : 'likert7',
        question : {
            en : 'What happens to me in the <span class="highlightText">future</span> mostly depends on me',
            si : 'මට අනාගතයේදී සිදුවන දෙය බොහෝවිට රඳාපවතින්නේ මා මතය.',
            ta : 'எதிர்காலத்தில் எனக்கு என்ன நடக்கும் என்பது என்னைப் பொறுத்ததாகும்',
            dv : 'މުސްތަގުބަލުގައި އަހަރެންނަށް ވާނެ ގޮތް ބޮޑަށް އޮތީ އަހަރެންގެ އަތް މަތީގައި'
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
    {   //7     35    Do anything I set my mind to do
        type : 'likert7',
        question : {
            en : 'I can <span class="highlightText">do just about anything</span> I really set my mind to do',
            si : 'මට මා සිතන ඕනෑ දෙයක් කළ හැකිය',
            ta : 'நான் உண்மையிலேயே செய்ய நினைத்த எதையும் என்னால் செய்ய முடியும்',
            dv : 'އަހަރެން ކުރަން ވިސްނާ ހުރިހާ ކަމެއްހެން އަހަރެންނަށް ކުރެވޭނެ'
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
    {   //8     36    Friends talk about problems and issues they face
        type : 'likert7',
        question : {
            en : 'People in my circle of friends are able to talk about <span class="highlightText">problems and tough issues</span> that they face',
            si : 'මගේ මිතුරු සමාජය තුළ සිටින මිනිසුන්ට ප්‍රශ්න සහ ඔවුන් මුහුණදෙන බරපතල ගැටලු පිළිබඳ සාකච්ඡා කළ හැකිය.',
            ta : 'எனது நட்பு வட்டத்தில் உள்ளவர்கள் தாங்கள் எதிர்கொள்ளும் பிரச்சினைகள் மற்றும் கடினமான சிக்கல்கள் பற்றி பேச முடியும்',
            dv : 'އަހަރެންގެ ގާތް ތަހުމަތްތެރިންގެ މެދުގައި އެމީހުންނަށް ކުރިމަތިވާ މައްސަލަތަކާއި، ދަތި އުނދަގޫ ކަންތައްތަކުގެ ވާހަކަ ފަސޭހައިން ދެކެވޭ'
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
    {   //9     37    Take a risk in circle of friends
        type : 'likert7',
        question : {
            en : 'I feel safe to take a <span class="highlightText">risk</span> in my circle of friends',
            si : 'මගේ මිතුරු කවය තුළදී අවදානම් ගැනීම මට ආරක්ෂිතය.',
            ta : 'எனது நட்பு வட்டத்தில் அபாயத்தை கையாள்வதில் நான் பாதுகாப்பாக உணர்கிறேன்',
            dv : 'އަހަރެންގެ ގާތް ތަހުމަތްތެރިންގެ މެދުގައި ހިރާސް ނަގަން އަހަރެންނަށް ކެރޭ'
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
    {   //10    38    Difficult to ask my circle of friends for help
        type : 'likert7',
        question : {
            en : 'It is difficult to ask my circle of friends for <span class="highlightText">help</span>',
            si : 'මගේ මිතුරු කවයෙන් උපකාරයක් ලබාගැනීම දුෂ්කරය.',
            ta : 'என் நட்பு வட்டத்தில் உதவி கேட்பது கடினம்',
            dv : 'އަހަރެންގެ ގާތް ތަހުމަތްތެރިންގެ ކިބައިން އެހީއަށް އެދެން އުނދަގޫވޭ'
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
    {   //11    39    No one in cicle of friends act to hurt my study or work
        type : 'likert7',
        question : {
            en : 'No one in my circle of friends would intentionally act in a way to <span class="highlightText">hurt my study or work</span>',
            si : 'මගේ මිතුරු කවයේ කිසිවකු මගේ අධ්‍යයන හෝ කාර්යයන්ට එරෙහිව සිතාමතාම ක්‍රියාකරන්නේ නැත.',
            ta : 'எனது நண்பர்கள் வட்டத்தில் உள்ள யாரும் வேண்டுமென்றே எனது கல்வியையோ​​ அல்லது வேலையையோ காயப்படுத்தும் வகையில் செயற்பட மாட்டார்கள்',
            dv : 'އަހަރެންގެ ގާތް ތަހުމަތްތެރިން ގަސްދުގައި އަހަރެންގެ ކިޔެވުން ނުވަތަ މަސައްކަތަށް ނޭދެވޭ އަސަރުކުރާނެފަދަ ކަމެއް ނުކުރާނެ'
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
    {   //12    40    Skills and talents are valued and utilized
        type : 'likert7',
        question : {
            en : 'Within my circle of friends, my unique <span class="highlightText">skills and talents</span> are valued and utilized',
            si : 'මගේ මිතුරු කවය තුළ, මගේ සුවිශේෂ කුසලතාවන් හා සහජ හැකියාවන් ඇගයීමට ලක්වේ.',
            ta : 'எனது நண்பர்கள் வட்டத்திற்குள், எனது தனிப்பட்ட திறன்கள் மற்றும் திறமைகள் பெறுமதியாக்கப்பட்டு  பயன்படுத்தப்படுகின்றன',
            dv : 'އަހަރެންގެ ގާތް ތަހުމަތްތެރިންގެ މެދުގައި އަހަރެންގެ ޚާއްސަ ހުނަރާއި ފަންނު ބަލައިގަނެ ބޭނުންކުރޭ'
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
    {   //13    41    Mistake held against me by my circle of friends
        type : 'likert7',
        question : {
            en : 'If I make a <span class="highlightText">mistake</span>, it is often held against me by my circle of friends',
            si : 'මට වරදක් සිදුවුවහොත්, මගේ මිතුරුසමාජය විසින් එය මට එරෙහිව භාවිතා කරනු ලැබේ.',
            ta : 'நான் தவறு செய்தால், என் நட்பு வட்டத்தில் அது அநேகமாக எனக்கு எதிரானதாக இருக்கும்',
            dv : 'އަހަރެންނަށް ގޯހެއް ހެދިއްޖެނަމަ އަހަރެންގެ ގާތް ތަހުމަތްތެރި އެކަން އަހަރެންނާ ދެކޮޅަށް ބޭނުންކުރޭ'
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
    {   //14    42    Friends reject others for being different
        type : 'likert7',
        question : {
            en : 'People in my circle of friends sometimes <span class="highlightText">reject others for being different</span>',
            si : 'මගේ මිතුරු කවයේ සිටින පුද්ගලයෝ ඇතැම්විට වෙනස් නිසා සෙසු අය ප්‍රතික්ෂේප කරති.',
            ta : 'எனது நட்பு வட்டத்தில் உள்ளவர்கள் சில சமயங்களில் வித்தியாசமானவர்கள் என்பதற்காக மற்றவர்களை நிராகரிக்கிறார்கள்',
            dv : 'އެހެން މީހުންގެ ހުންނަ ތަފާތުތަކެއްގެ ސަބަބުން އަހަރެންގެ ގާތް ތަހުމަތްތެރިންގެ ތެރެއިން ބައެއް މީހުން، އެމީހުން ބާކީކޮށްލާ'
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