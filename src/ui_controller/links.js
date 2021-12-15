import '../style.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore"; 
// import langId from '../questions/questions.js'



let langId = localStorage.getItem('lang')
let loc = parseInt(localStorage.getItem('loc'))
let docId = localStorage.getItem('doc')

if(langId === null || loc === null || docId === null){
    window.location.replace('./')
}

const firebaseConfig = {
    apiKey: "AIzaSyCXExV3lCZdNl34Wy8RyODHP9ZN14Bj5xM",
    authDomain: "undp-survey.firebaseapp.com",
    projectId: "undp-survey",
    storageBucket: "undp-survey.appspot.com",
    messagingSenderId: "274504786931",
    appId: "1:274504786931:web:fc4eca9ef0ab19a3f22886",
    measurementId: "G-7WVM2PQ54C"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();


let allTexts = {
    resultTitle : [
        {
            en : 'You are the Change Seeker',
            si : 'ඔබ තමයි වෙනස්කම් නිර්මාණය කරන්නා',
            ta : 'நீங்கள்தான் ஒரு மாற்றத்தை உருவாக்குபவர்',
            dv : 'ތިބާއަކީ ބަދަލެއް އެދި ހޯދާ މީހެއް'
        },
        {
            en : 'You are the Map Maker',
            si : 'ඔබ තමයි සිතියම් සකසන්නා ',
            ta : 'நீங்கள்தான் ஒரு வரைபட வகுப்பாளர்',
            dv : 'ތިއީ ޗާޓި ކުރަހާ މީހެއް'
        },
        {
            en : 'You are the Adventurer',
            si : 'ඔබ තමයි සූරයා',
            ta : 'நீங்கள்தான் ஒரு விநோத விரும்பி ',
            dv : 'ތިއީ އާ ކަންކަން ތަޖުރިބާކުރާ މީހެއް'
        }
    ],
    linksPage:[
        //low LOC - 0
        {//high external loc
            // `From the way you’ve
            // answered, it sounds like you
            // can often feel at a loss when
            // it comes to making big
            // decisions in your life.
            en : `You have ability and inner strength to
            make small changes for the better. 
            You can often feel at a loss when it comes to making big decisions in your life. 
            Remember, you are the main character in your life story.
            
            <br>
            <br>
            In difficult situations or when experiencing life’s various challenges, you sometimes feel bitter towards the world. “Why is this happening to me?” you ask yourself. “Why do I always end up with such bad luck?” Even when it comes to your successes, you can lack faith in your own abilities and you find yourself downplaying your achievements. You sometimes have serious doubts about whether or not you have the power to turn your life around when things take a turn for the worse.
             Like a leaf blowing in the wind, you feel like life steers you in all these different directions without a moment to catch your breath. 
            
            <br>
            <br>
            Even when you feel overwhelmed or that situations are beyond your control, each of us has the ability and inner strength to make small changes for the better. Remember, you are the main character in your life story. You might not be able to change other people around you, but you can change the way in which you feel about them and adapt.
             Take a step back and think: what small steps can I take in the right direction, right now? Rather than focusing on the things you cannot control, concentrate on what you can. Even the littlethings can end up having a big impact further down the line.
            
            <br>
            <br>
            Need a boost? Check out
            these websites that might be
            helpful to you:`,
            
            //  `ඔබ පිළිතුරු සපයා තිබෙන ආකාරය අනුව, ඔබගේ ජීවිතය සම්බන්ධ වැදගත් තීරණ ගැනීමේදී ඔබට බොහෝ විට පරාජිත හැඟීමක් දැනෙන බව පෙනේ. 
            si :` යහපත වෙනුවෙන් පුංචි වෙනස්කම් සිදුකිරීමේ හැකියාව හා අභ්‍යන්තර ශක්තිය ඔබට තිබෙනවා. ඔබගේ ජීවිතය සම්බන්ධ වැදගත් තීරණ ගන්නා විට ඔබ බොහෝවිට අපහසුවට පත්වෙනවා. ඔබගේ ජීවිතයේ ප්‍රධාන චරිතය ඔබ බව මතක තබාගන්න. 
            <br>
            <br>
            දුෂ්කර තත්වයන්හිදී හෝ ජීවිතයේ විවිධ අභියෝගවලදී ඔබට ඇතැම්විට හැඟෙන්නේ “ඇයි මටම මෙහෙම වෙන්නේ” කියාය. “මටම හැමවිටම මෙවැනි අවාසනාවන් වෙන්නේ ඇයි?” යි කියා ඔබ අසයි. ඔබගේ ජයග්‍රහණවලදී පවා ඔබට ඔබගේ හැකියාවන් ගැන විශ්වාසය අවම විය හැකිය. ඔබ ඔබේ ජයග්‍රහණ සුළුකොට තකයි. නරක දේ සිදුවෙද්දී ඒවා සමග අරගල කිරීමට ඔබට ශක්තිය තිබේදැයි ඇතැම්විට ඔබට සැක සිතෙයි. ඔබට හුස්ම ගන්නත් ඉඩ නොදී, ජීවිතය ඔබ සුළඟේ පාවන තුරු පතක් සේ විවිධ දිශාවලට රැගෙන යන බවක් ඔබට හැඟේ. 
            
            <br>
            <br>
            අධික පීඩනයට ලක්වූ විට හෝ තත්වය ඔබගේ පාලනයෙන් තොර බව හැඟෙන විට පවා, අප හැම කෙනෙකුටම තත්වය වඩා යහපත් කළ හැකි සුළු වෙනස්කම් සිදුකිරීමේ හැකියාව හා අභ්‍යන්තර ශක්තිය තිබේ. ඔබගේ ජීවිත කතාවේ ප්‍රධාන චරිතය ඔබම බව සිතන්න. ඔබට ඔබ වටා සිටින අනෙක් අය වෙනස් කළ නොහැකි වන්නට පුළුවන. එහෙත්, ඔබ එම තත්වයන් ගැන සිතන ආකාරය හා ඒවාට අනුගත වන ආකාරය ඔබට වෙනස් කළ හැකිය. පසුපසට පියවරක් තබා සිතන්න. නිවැරදි දිශාව දෙසට මට මේ දැන් තැබිය හැකි කුඩා පියවරක් තිබේද? ඔබට පාලනය කළ නොහැකි දෙයට වඩා, පාලනය කළ හැකි දෙය කෙරෙහි සිත යොමුකරන්න. සුළු දෙයින් පවා අවසානයේදී ලොකු ප්‍රතිඵල ඇතිවිය හැකිය. 
            
            <br>
            <br>
            දිරිගැන්වීමක් අවශ්‍යද? මෙම වෙබ් අඩවි ඔබට ප්‍රයෝජනවත් විය හැකිය.
            `,
            // `நீங்கள் பதிலளித்த விதத்தில் இருந்து, உங்கள் வாழ்க்கையில் பெரிய தீர்மானங்களை எடுக்கும்போது நீங்கள் அடிக்கடி இழப்பை உணரலாம்.
            
            ta : `சிறந்த விடயங்களுக்காக சிறிய மாற்றங்களைச் செய்யக்கூடிய திறனும் மன வலிமையும் உங்களிடம் உண்டு. உங்கள் வாழ்க்கையின் முக்கியமான தீர்மானங்களை எடுக்கும்போது எதோவொன்றை இழந்ததைப் போன்று நீங்கள் அடிக்கடி உணரலாம்.
            உங்கள் வாழ்க்கைக் கதையில் நீங்கள்தான் முக்கிய கதாபாத்திரம் என்பதை நினைவிற்கொள்ளுங்கள்
            
            <br>
            <br>
            கடினமான சூழ்நிலைகளில் அல்லது வாழ்க்கையில் பல்வேறு சவால்களை சந்திக்கும் போது, ​​நீங்கள் சில சமயங்களில் உலகத்தின் மீது கசப்பாக உணர்கிறீர்கள். "இது எனக்கு ஏன் நடக்கிறது?" என்றும் "நான் ஏன் எப்பொழுதும் இத்தகைய துரதிர்ஷ்டத்தை அடைந்தேன்?" என்றும் நீங்களே உங்களைக் கேட்டுக் கொள்கின்றீர்கள். உங்கள் வெற்றிகளைப் பொறுத்தவரை, உங்கள் சொந்த திறன்களில் நம்பிக்கை இல்லாமல் இருப்பதுடன்,  உங்கள் சாதனைகளை நீங்கள் குறைத்து மதிப்பிடுவதைக் காணலாம். சில சமயங்களில், விடயங்கள் மோசமான நிலைக்குத் திரும்பும்போது, ​​உங்கள் வாழ்க்கையைத் திருப்ப உங்களுக்கு சக்தி இருக்கிறதா இல்லையா என்பது குறித்து உங்களுக்கு சில நேரங்களில் தீவிர சந்தேகம் இருக்கும். காற்றில் வீசும் இலையைப் போல, உங்கள் மூச்சு விடக்கூட ஒரு நிமிடமும் இல்லாமல் வாழ்க்கை உங்களை வெவ்வேறு திசைகளில் தள்ளுவதைப் போல் உணர்கிறீர்கள்.
            
            <br>
            <br>
            நீங்கள் அதிகமாக உணர்ந்தாலும் அல்லது சூழ்நிலைகள் உங்கள் கட்டுப்பாட்டிற்கு அப்பாற்பட்டதாக இருந்தாலும் கூட, நம் ஒவ்வொருவருக்கும் சிறிய மாற்றங்களைச் செய்யும் திறனும் உள் வலிமையும் உள்ளது. நினைவிற் கொள்ளுங்கள், உங்கள் வாழ்க்கைக் கதையில் நீங்கள் தான் முக்கிய கதாபாத்திரம். உங்களைச் சுற்றியுள்ள மற்றவர்களை உங்களால் மாற்ற முடியாமல் போகலாம், ஆனால் அவர்களைப் பற்றி நீங்கள் உணரும் விதத்தை மாற்றிக்கொள்ளலாம். ஒரு தடவை பின்வாங்கி சிந்தியுங்கள்: இப்போது சரியான திசையில் நான் எவ்வாறு சிறிய காலடி எடுத்துவைக்க முடியும்?. உங்களால் கட்டுப்படுத்த முடியாத விஷயங்களில் கவனம் செலுத்துவதற்குப் பதிலாக, உங்களால் முடிந்தவற்றில் கவனம் செலுத்துங்கள். சிறிய விடயங்கள் கூட பெரிய தாக்கத்தை ஏற்படுத்தும்.
            
            <br>
            <br>
            உங்களுக்கு உந்துதல் தேவையா? உங்களுக்கு உதவியாக இருக்கும் இந்த இணையதளங்களைப் பாருங்கள்:`,
            
            dv : `
            ހެޔޮ ބަދަލަކަށްޓަކައި ކުދިކުދި ކަންކަން ކުރުމަށް ތިބާގެ ގާބިލުކަމާއި، އަމިއްލަ ނަފްސުގެ ބާރު އެބަ ހުއްޓެވެ ތިބާގެ ހަޔާތުގެ ބޮޑެތި ނިންމުންތައް ނިންމަންޖެހުމުން، ހަދާނެގޮތް ނޭނގޭކަމުގެ އިހުސާސް ކުރެވިދާނެއެވެ. ހަނދާންކުރާށެވެ. ތިބާގެ ހަޔާތުގެ މައިގަނޑު ރޯލު އަދާކުރާ މީހަކީ ހަމަ ތިބާއެވެ.

            <br>
            <br>

            އުނދަގޫ ހާލަތްތަކުގައި، ނުވަތަ ހަޔާތުގެ އެކިއެކި ގޮންޖެހުންތައް ތަޖުރިބާކުރާއިރު މި ދުނިޔެއާމެދު ހިތްބަރުކަމެއް އިހުސާސްވާނެއެވެ. [އަހަރެންނަށް މިހެން މިވަނީ ކީއްވެ] ތޯ ތިބާ އަމިއްލަ ނަފްސާ ސުވާލުކުރާނެއެވެ. [އަބަދުވެސް އަހަރެންނަށް ބަދުނަސީބު ގޮތް މެދުވެރިވަނީ ކީއްވެ] ތޯ ސުވާލުކުރާނެއެވެ. ތިބާގެ ކާމިޔާބީތަކުގައިވެސް އަމިއްލަ ގާބިލުކަމާމެދު ޔަގީންކަން ކުޑަވެ، ކާމިޔާބީތަކަކީ ކުޑަ ކަމެއްގެ ގޮތުގައި ދެކެވޭނެއެވެ. ކަންކަން ގޯސްވުމުން، ތިބާގެ ހަޔާތް ބަދަލުކޮށްލުމުގެ ބާރު އޮތް ކަމާމެދު ތިބާއަށް ބޮޑެތި ޝައްކުތައް ކުރެވެއެވެ. ވަޔާއެކު ވިހުރޭ ފަތެއްހެން، ހިނދުކޮޅަކަށްވެސް މަޑުކޮށްލުމުގެ ފުރުސަތު ނުލިބި ތިބާ ހަޔާތުގެ ކޮޅުކޮޅަށް ގެންދާކަމުގެ އިހުސާސް ކުރެވޭނެއެވެ.

            <br>
            <br>
            ކަންކަން އަމިއްލަ ކޮންޓްރޯލުން ބޭރުވެފައިވާކަމުގެ އިހުސާސް ކުރެވޭއިރުވެސް، އެކަންކަން ރަނގަޅުކުރުމަށް ކުދިކުދި ބަދަލުތައް ގެނައުމުގެ ގާބިލުކަމާއި ހިތްވަރު އަހަރެމެންގެ ތެރެއިން ކޮންމެ މީހަކަށްވެސް ލިބިގެންވެއެވެ. ތިބާގެ ހަޔާތުގެ މައިގަނޑު ރޯލު ކުޅޭނީ ތިބާކަން ހަނދާން ބަހައްޓާށެވެ. ތިބާއަށް ތިބާގެ ވަށައިގެންވާ އެހެން މީހުން ބަދަލު ނުކުރެވިދާނެއެވެ. ނަމަވެސް ތިބާ އެމީހުންނާމެދު ވިސްނާގޮތް ބަދަލުކޮށް އެއާ އެއްގޮތަށް ތިބާއަށް ބަދަލުވެވިދާނެއެވެ. އެއް ފިޔަވަޅު ފަހަތަށް ޖެހިލުމަށްފަހު ވިސްނާލާށެވެ: މިވަގުތު ރަނގަޅު މަގުން އަހަރެންނަށް އެޅޭނީ ކޮން ކުދި ފިޔަވަޅުތަކެއް ހެއްޔެވެ؟ ތިބާއަށް ކޮންޓްރޯލު ނުކުރެވޭނެ ކަންކަމާމެދު ވިސްނުމުގެ ބަދަލުގައި، ކޮންޓްރޯލު ކުރެވޭނެ ކަންކަމަށް އިސްކަންދޭށެވެ. އެންމެ ކުދި ކަންކަމުންވެސް ކުރިއަށް އޮތްތަނުގައި ބޮޑު ތަފާތެއް ގެނެވިދާނެއެވެ.

            <br>
            <br>
            އެހީއެއް ބޭނުންހެއްޔެވެ؟ ތިބާއަށް ބޭނުން ހިފިދާނެ އަންނަނިވި ވެބްސައިޓުތައް ބަލާލާށެވެ:`
        },
        //Mid LOC - 1
        {
            // `From the answers you’ve
            // provided, it sounds like you
            // can sometimes feel a bit
            // unsure when it comes to
            // making big decisions in your
            // life.
            en : `Confidence comes from within, and you can find ways to build it. 
            You can sometimes feel a bit unsure when it comes to making big decisions in your life.

            <br>
            <br>
            People like you feel they have control over some of the situations and experiences that affect them but not others. When you face a crossroad or challenge in your life, you can sometimes lose confidence and falter, but you do find your way in the end. 
             You feel like some of your successes are your own, but find yourself making excuses for these, telling people that your achievements were due to luck, or by being in the right place at the right time. On the other side of the table, when life knocks you back, you sometimes find yourself spending periods of time wondering why the universe is standing against you. But you should be proud of your achievements. When it comes to difficult life choices, have faith in your abilities to make the right decision for you. You’ve got this!

            <br>
            <br>
            Need a bit of advice for that?
            Here are some websites that
            might interest you:`,
            
            // si : `ඔබ විසින් සපයන ලද පිළිතුරුවලින් ඇඟවෙන්නේ, ඔබගේ ජීවිතය සම්බන්ධයෙන් ඉතා වැදගත් තීරණ ගැනීමේදී ඔබ ඇතැම්විට විශ්වාසයෙන් කටයුතු නොකරන බවයි. 
            si : `විශ්වාසය ගොඩනැගෙන්නේ ඇතුළතිනි. ඔබට එය ගොඩනගාගත හැකි ආකාරය සොයාගත හැකිය.  
            ඇතැම්විට, ජීවිතය සම්බන්ධ වැදගත් තීරණ ගන්නා විට ඔබට තරමක අවිශ්වාසයක් දැනෙයි. 
            
            <br>
            <br>
            ඔබ වැනි පුද්ගලයන් සිතන්නේ, සෙසු අයට නොව, ඔබට බලපාන ඇතැම් තත්වයන් හා අත්දැකීම් සම්බන්ධයෙන් ඔබට පාලනයක් තිබෙන බවයි. ඔබ ජීවිතයේ ගැටලුවකට හෝ අභියෝගයකට මුහුණදුන් විට, ඇතැම්විට ඔබගේ ආත්ම විශ්වාසය ගිලිහීගොස් පසුබැසීමක් සිදුවිය හැකිය. එහෙත්, අවසානයේදී ඔබ ගත යුතු මාර්ගය සොයාගනියි.
             ඔබගේ ඇතැම් සාර්ථකත්වයන් ඔබගේම ඒවා යයි ඔබ සිතයි. එහෙත්, ඔබ එය විවෘතව කියන්නට මැලිවෙයි. ඔබගේ සාර්ථකත්වයට හේතුව වාසනාව හෝ අහම්බයකැයි කියයි. මේ අතරතුර, මුළු ලෝකයම ඔබට එරෙහිව නැගී සිටින්නේ මන්දැයි කල්පනා කිරීමට ද ඔබ ඇතැම්විට විශාල කාලයක් ගතකරයි. එහෙත්, ඔබ ඔබගේ ජයග්‍රහණ සම්බන්ධයෙන් ආඩම්බර විය යුතුය. ජීවිතය සම්බන්ධ දුෂ්කර තෝරාගැනීම් කිරීමට සිදුවූ විටදී, නිවැරදි තීරණ ගැනීම සඳහා ඔබගේ හැකියාවන් පිළිබඳ විශ්වාසය තබන්න. ඔබට එය වැටහේ. 
            
            <br>
            <br>
            ඒ සම්බන්ධ උපදෙස් අවශ්‍යද?  මෙහි දැක්වෙන්නේ ඒ සඳහා වෙබ් අඩවි කීපයකි.
            `,
            
            //  `நீங்கள் வழங்கிய பதில்களிலிருந்து, உங்கள் வாழ்க்கையில் பெரிய தீர்மானங்களை எடுக்கும்போது சில சமயங்களில் நீங்கள் சற்று உறுதியற்றதாக உணரலாம்.
            ta :`தன்னம்பிக்கை என்பது உள்ளிருந்து வருகின்றது. அதனை உருவாக்குவதற்கான வழிகளை நீங்கள் கண்டுபிடிக்கலாம். 
            உங்கள் வாழ்க்கையின் முக்கியமான தீர்மானங்களை எடுக்கும்போது, சில சந்தர்ப்பங்களில் நீங்கள் நிச்சயமற்ற தன்மையைப் போன்று உணரலாம்

            <br>
            <br>
            உங்களைப் போன்றவர்கள் தங்களைப் பாதிக்கும் சில சூழ்நிலைகள் மற்றும் அனுபவங்களின் மீது கட்டுப்பாட்டைக் கொண்டிருப்பதாக உணர்கின்றதுடன், ஆனால் மற்றையவர்களின் மீது அல்ல. உங்கள் வாழ்க்கையில் ஒரு  வழி அல்லது சவாலை நீங்கள் எதிர்கொள்ளும்போது, ​​நீங்கள் சில சமயங்களில் நம்பிக்கையை இழந்து தடுமாறலாம், ஆனால் இறுதியில் உங்கள் வழியை நீங்கள் கண்டுபிடிப்பீர்கள். உங்களின் சில வெற்றிகள் உங்களுக்கே சொந்தம் என நீங்கள் உணர்கிறீர்கள், ஆனால் நீங்கள் இவற்றுக்கு சாக்குப்போக்குகளை கூறி, உங்கள் சாதனைகள் அதிர்ஷ்டம் அல்லது சரியான நேரத்தில் சரியான இடத்தில் இருப்பதன் மூலம் உங்களின் சாதனைகள் ஏற்பட்டதாக மக்களிடம் சொல்லுகிறீர்கள். மறுபக்கத்தில், வாழ்க்கை உங்களைப் பின் தள்ளும் போது, ​​பிரபஞ்சம் ஏன் உங்களுக்கு எதிராக நிற்கின்றது என்று அதிசயித்து அதை கண்டறிய நீங்கள் சில சமயங்களில் நேரத்தைச் செலவிடுவதைக் காணலாம். ஆனால் உங்களின் சாதனைகளைப் பற்றி நீங்கள் பெருமைப்பட வேண்டும். கடினமான வாழ்க்கைத் தெரிவுகள் என்று வரும்போது, ​​உங்களுக்கான சரியான தீர்மானத்தை எடுப்பதற்கான உங்கள் திறன்களில் நம்பிக்கை வைத்திருங்கள். உங்களுக்கு இது கிடைத்திருக்கின்றது!
            
            <br>
            <br>
            அதற்கான சிறிது  ஆலோசனை வேண்டுமா? உங்களுக்கு ஆர்வமூட்டக்கூடிய சில இணையதளங்கள் இதோ:`,
            
            dv : `
            އަމިއްލަ ނަފްސަށް ކުރާ އިތުބާރަކީ ތިބާގެ ނަފްސުގެ ތެރެއިން ލިބޭނެ އެއްޗެކެވެ. އަދި އެ އިތުބާރު އިތުރަށް ބިނާކުރެވޭނެ ގޮތްތައް ތިބާއަށް ހޯދިދާނެއެވެ
ހަޔާތުގެ ބޮޑެތި ނިންމުންތައް ނިންމަންޖެހުމުން ތިބާއަށް އެހާ ޔަގީންކަން ނެތްކަން އިހުސާސްކުރެވިދާނެއެވެ.


            <br>
            <br>
            ތިބާ ކަހަލަ މީހުންނަށް، އެމީހުންނަށް އަސަރުކުރާ ބައެއް ހާލަތްތަކުގެ މައްޗަށް ކޮންޓްރޯލު އޮންނަ ކަމުގެ އިހުސާސް ކުރެވޭނެއެވެ. ހަޔާތުގައި ހަތަރު އަނގޮޅިއެއް ނުވަތަ ގޮންޖެހުމެއް ކުރިމަތިވުމުން ތިބާގެ އަމިއްލަ ނަފްސަށް އޮންނަ އިތުބާރު ގެއްލި، ގޯސް ނިންމުންތައް ނިންމެއެވެ. ނަމަވެސް، އާޚިރުގައި ރަނގަޅު ގޮތް ހޯދެއެވެ. ތިބާގެ ބައެއް ކާމިޔާބީތަކަކީ އަމިއްލަ ކާމިޔާބީތަކެއްކަމަށް ގަބޫލުކުރެވެއެވެ. ނަމަވެސް، އެކަމަށް އުޒުރު ދެއްކޭކަން ފާހަގަކުރެވެއެވެ. އެގޮތުން، ތިބާގެ ކާމިޔާބީތަކަކީ ނަސީބާއި، ރަނގަޅު ވަގުތު ރަނގަޅު ތަނުގައި ހުރުމުން ކުރިމަތިވި ކަމެއް ކަމަށް ބުނެވެއެވެ. އޭގެ އަނެއްކޮޅުން، ހަޔާތުގައި އަޑިގުޑަން ގަނޑަކާ ކުރިމަތިވުމުން، ބައެއްފަހަރު ތިބާއަށް ގިނަ ވަގުތު ހޭދަކުރެވެނީ، ދުނިޔެ ތިބާއާ ދެކޮޅުވަނީ ކީއްވެތޯ ސުވާލުކުރުމުގައެވެ. ނަމަވެސް، ތިބާގެ ކާމިޔާބީތަކާމެދު ތިބާ ފަޚުރުވެރި ވާންވާނެއެވެ. ހަޔާތުގެ އުނދަގޫ ނިންމުންތަކާ ޖެހުމުން، ރަނގަޅު ނިންމުން ނިންމުމަށް ތިބާގެ ހުރި ގާބިލުކަމާމެދު ޝައްކު ނުކުރާށެވެ. ތިބާއަށް މިކަން ވާނެއެވެ!

            <br>
            <br>
            މިކަމުގައި ލަފައެއް ބޭނުން ހެއްޔެވެ؟ މިއީ ތިބާއަށް ބޭނުން ހިފިދާނެ ބައެއް ވެބްސައިޓްތަކެވެ:`
        },
        //High LOC - 2
        {//High internal loc
            // `Nice one! It sounds like you
            // feel reasonably empowered
            // when it comes to making big
            // decisions about which path
            // in life to take!
            en : `Nice one! You are not afraid to make big decisions and confident. You can accomplish whatever you set your mind to.

            <br>
            <br>
            People like you generally feel they have control over situations that affect them. When it comes to things like education and employment, you feel that your successes are to a large extent due to your own hard work and perseverance, rather than a product of society or systems around you.
             When it comes to challenges and struggles, you feel these are temporary because, despite life’s knocks and tumbles, you have the power and motivation within you to change your circumstances. You know that things will get better in the future if you maintain your proactive attitude.
            
            <br>
            <br>
            But sometimes there are people who don’t feel this way. They can feel trapped, like their options and opportunities are limited, and that they have to live with their lot.
             People like you can make a huge difference by helping others see beyond the confines of their immediate situation and lifting them up to realise they do have the power to take back control over their own lives.

            <br>
            <br>
            Want to help, but need some
            advice? Check out these
            helpful websites:`,
            
            // si : `කදිමයි! ජීවිතයේදී ඔබ ගත යුතු මාර්ගය සම්බන්ධයෙන් වැදගත් තීරණ ගැනීමේදී ඔබ සෑහෙන දුරට සවිබලගැන්වී සිටින බව පෙනේ. 
            si : `ඉතා හොඳයි! ඔබ ආත්ම විශ්වාසයෙන් යුක්තයි. ජීවිතය සම්බන්ධ වැදගත් තීරණ ගන්නට ඔබ බය නැහැ. සිතට ගන්නවා නම් ඕනෑම දෙයක් කරන්නට ඔබට පුළුවන්.

            <br>
            <br>
            ඔබ වැනි ජනයා සාමාන්‍යයෙන් සිතන්නේ තමන්ට බලපාන තත්වයන් සම්බන්ධයෙන් තමන්ට පාලනය ඇති බවයි. අධ්‍යාපනය සහ රැකියා වැනි කාරණාවලදී ඔබගේ සාර්ථකත්වය වැඩියෙන් රඳාපවතින්නේ ඔබගේම සාර්ථකත්වය මත හා උද්‍යෝගය මත බවයි. එසේ නොමැතිව සමාජයේ හෝ ඔබ වටා තිබෙන ක්‍රමය මත නොවේ. අභියෝග හා අරගල සම්බන්ධයෙන් සැලකූ විට, ඔබ සිතන්නේ ඒවා තාවකාලික බවයි. හේතුව, ජීවිතයේ කුමන අභියෝග මතු වුවත්, තත්වයන් වෙනස් කරගැනීම සඳහා අවශ්‍ය බලය හා අභිප්‍රේරණය ඔබ සතුය. ඔබගේ ප්‍රගාමී ආකල්ප පවත්වාගෙන ගියහොත්, අනාගතයේදී තත්වයන් වෙනස් වන බව ඔබ දනී. 
            
            <br>
            <br>
            එහෙත්, ඇතැම්විට, ඒ අන්දමින් නොසිතන අය ද සිටිති. ඔවුන්ට තමන් උගුලක අසුවී සිටින බවක් සිතේ. ඔවුන්ගේ විකල්ප හා අවස්ථා සීමිත බව දැනේ. ඔවුන්ට එම තත්වය දරාගැනීමට සිදුවේ යයි සිතේ. වෙනත් අයට තම ආසන්න තත්වයේ සීමාවෙන් ඔබ්බට දැකීමට උපකාර කිරීම මගින් තම ජීවිතවල පාලනය යළි සියතට ගැනීමට බලය තිබෙන බව අවබෝධ කර දීමට ඔබ වැනි පුද්ගලයන්ට හැකිය.   
            
            <br>
            <br>
            උපකාර කිරීමට කැමතිද? ඒ සම්බන්ධ උපදෙස් අවශ්‍ය නම්, මෙම වෙබ් අඩවි බලන්න: 
            `,
            
            //  `அழகானது! வாழ்க்கையில் எந்தப் பாதையில் செல்வது என்பது குறித்து பெரிய தீர்மானங்களை எடுக்கும்போது நீங்கள் நியாயமான முறையில் வலுவூட்டப்படுவது போல் தெரிகிறது!
            ta:`சிறந்த விடயம்! முக்கியமான தீர்மானங்களை எடுக்க நீங்கள் அஞ்சமாட்டீர்கள் மற்றும் நம்பிக்கையுடன் உள்ளீர்கள். 
            நீங்கள் நினைக்கின்ற விடயத்தை சாதிக்க முடியும்
            <br>
            <br>
            உங்களைப் போன்றவர்கள் பொதுவாக தங்களைப் பாதிக்கும் சூழ்நிலைகளில் கட்டுப்பாட்டைக் கொண்டிருப்பதாக உணர்கிறார்கள். கல்வி மற்றும் வேலைவாய்ப்பு போன்ற விடயங்களில், உங்கள் வெற்றிகள் பெருமளவிற்கு உங்களைச் சுற்றியுள்ள சமூகம் அல்லது அமைப்புகளின் உருவாக்கத்திலும் பார்க்க உங்கள் சொந்த உழைப்பு மற்றும் விடாமுயற்சியின் காரணமாக இருப்பதாக நீங்கள் உணர்கிறீர்கள். சவால்கள் மற்றும் போராட்டங்கள் என்று வரும்போது, ​​இவை தற்காலிகமானவை என்று நீங்கள் உணர்கிறீர்கள், ஏனெனில், வாழ்க்கையில் தடைகள் மற்றும் தடுமாற்றங்கள் வந்தபோதிலும், உங்கள் சூழ்நிலைகளை மாற்றுவதற்கான சக்தியும் உந்துதலும் உங்களுக்குள் உள்ளது. நீங்கள் முன்னெச்சரிக்கை நடத்தையை கடைப்பிடித்தால் எதிர்காலத்தில் விடயங்கள் சிறப்பாக இருக்கும் என்பதை நீங்கள் அறிவீர்கள். 
            
            <br>
            <br>
            ஆனால் சில நேரங்களில் இதை உணராதவர்கள் இருக்கிறார்கள். அவர்கள் தாம் அதிகமாக வாழ வேண்டும் என எண்ணுகையில் தங்களின் தெரிவுகள் மற்றும் வாய்ப்புகள் மட்டுப்படுத்தப்பட்டிருக்கும் போது தாம் பொறியில் சிக்கிக் கொண்டுள்ளதாக உணர முடியும். உங்களைப் போன்றவர்கள் மற்றவர்களுக்கு அவர்களின் உடனடி சூழ்நிலையின் எல்லைகளுக்கு அப்பால் பார்க்க உதவுவதன் மூலமும், அவர்கள் சொந்த வாழ்க்கையை மீண்டும் கட்டுப்படுத்தும் சக்தி தங்களுக்கு இருப்பதை உணர்ந்து அவர்களை உயர்த்துவதன் மூலமும் மிகப்பெரிய மாற்றத்தை ஏற்படுத்த முடியும்.
            
            <br>
            <br>
            உதவ விரும்புகிறீர்களா, ஆனால் சில ஆலோசனைகள் தேவையா? இந்த பயனுள்ள இணையதளங்களைப் பாருங்கள்:`,
            
            dv : `
            އަމިއްލަ ނަފްސަށް ކުރާ އިތުބާރަކީ ތިބާގެ ނަފްސުގެ ތެރެއިން ލިބޭނެ އެއްޗެކެވެ. އަދި އެ އިތުބާރު އިތުރަށް ބިނާކުރެވޭނެ ގޮތްތައް ތިބާއަށް ހޯދިދާނެއެވެ
ހަޔާތުގެ ބޮޑެތި ނިންމުންތައް ނިންމަންޖެހުމުން ތިބާއަށް އެހާ ޔަގީންކަން ނެތްކަން އިހުސާސްކުރެވިދާނެއެވެ.


            <br>
            <br>
            ތިބާ ކަހަލަ މީހުންނަށް، އެމީހުންނަށް އަސަރުކުރާ ހާލަތްތަކުގެ މައްޗަށް ކޮންޓްރޯލު އޮންނަ ކަމުގެ އިހުސާސް އާންމުގޮތެއްގައި ކުރެވޭނެއެވެ. ތައުލީމާއި، ވަޒީފާއާ ގުޅޭ ކަންކަމުގައި ތިބާގެ ކާމިޔާބީތަކުގެ ބޮޑު ބަޔަކީ މުޖުތަމައުގެ ނުވަތަ ނިޒާމުގެ ތެރެއިން ލިބުނު ކާމިޔާބެއް ކަމުގައި ބެލެވުމުގެ ބަދަލުގައި، އެއީ އަމިއްލަ ބުރަ މަސައްކަތާއި ހިތްވަރުގެ ނަތީޖާކަމަށް ގަބޫލުކުރެވޭނެ އެވެ. ގޮންޖެހުންތަކާއި، އުނދަގޫ ހާލަތްތަކާ ޖެހުމުން އެއީ ވަގުތީ ކަންކަން ކަމުގައި ތިބާއަށް ގަބޫލުކުރެވޭނެއެވެ. ސަބަބަކީ ހަޔާތުގައި ކިޔަންމެ ގިނަ އަޑި ގުޑަންތައް އައި ކަމަށްވިޔަސް، ތިބާގެ ހާލަތު ބަދަލުކުރުމުގެ ހިތްވަރާއި ބާރު ތިބާގެ ހުރީތީއެވެ. ތިބާ އިސް ނަގައިގެން މަސައްކަތް ކޮށްފިނަމަ މުސްތަގުބަލުގައި ކަންކަން ރަނގަޅުވާނެކަން ތިބާއަށް އެނގޭނެއެވެ.
            
            <br>
            <br>
            ނަމަވެސް، ބައެއް ފަހަރު މިގޮތަށް އިހުސާސްނުވާ މީހުން ތިބޭނެއެވެ. އެމީހުންނަށް އޮތް އިޚުތިޔާރުތައް މަދުކަމާއި، އެ ހާލަތަކައިގެން އުޅެން ޖެހިފައިވާކަމުގެ އިހުސާސް ކުރެވޭނެއެވެ. ތިބާ ކަހަލަ މީހުންނަށް، އެހެން މީހުން އެވަގުތަކު ތަހައްމަލު ކުރަމުންދާ ހާލަތަށްވުރެ ދުރަށް ވިސްނުމަށާއި، އެމީހުންގެ އަމިއްލަ ހަޔާތުގެ ކޮންޓްރޯލު ހޯދުމަށް އެމީހުންނަށް ހިތްވަރު ދިނުމަށް ތިބާ ކަހަލަ މީހުންނަށް ވަރަށް މުހިންމު ދައުރެއް އަދާކުރެވިދާނެއެވެ.

            <br>
            <br>
            އެހީތެރިކަން ފޯރުކޮށްދޭން ބޭނުންވެފައި، އެކަމުގެ ލަފައެއް ބޭނުންހެއްޔެވެ؟ މި ވެބްސައިޓުތައް ބަލާލާށެވެ:`
        },
    ]
}

let linkResultTitle = document.getElementById('links-result-header-container')
let linkResultSubText = document.getElementById('links-result-subtext-container')

window.addEventListener('load',function(){
    document.getElementById('links-page-container').style.display = 'initial'
    // console.log(langId);

    linkResultTitle.innerText = allTexts.resultTitle[loc][langId];
    linkResultSubText.innerHTML = allTexts.linksPage[loc][langId]
    updateResultLinks(loc)
    setLinksPageLang()
    
})

function setLinksPageLang(){
    const langTexts = {
        emailPlaceholder:{
            en:'Your Email',
            si:'ඔබේ විද්යුත් තැපැල් ලිපිනය',
            ta:'உங்கள் மின்னஞ்சல்',
            dv:'އީމެއިލް',
        },
        moreResources:{
            en:'More Resources',
            si:'තවත් සම්පත්',
            ta:'மேலும் வளங்கள்',
            dv:'އިތުރު ވަސީލަތްތައް',
        },
        additionalResources:{
            en:'Additional resources that may help you',
            si:'ඔබට උපකාර විය හැකි අමතර සම්පත්',
            ta:'உங்களுக்கு உதவக்கூடிய கூடுதல் வளங்கள்',
            dv:'ތިބާއަށް އެހީއަކަށް ވެދާނެ އިތުރު ވަސީލަތްތައް',
        },
        submit:{
            en:'submit',
            si:'ඉදිරිපත් කරන්න',
            ta:'சமர்ப்பிக்க',
            dv:'ހުށަހަޅާ',
        },
        addResource1:{
            en:'How to check if your friends are doing OK?',
            si:'ඔබේ මිතුරන් හොඳින් දැයි පරීක්ෂා කරන්නේ කෙසේද?',
            ta:'உங்கள் நண்பர்கள் நன்றாக இருக்கிறார்களா என்பதை எப்படிச் சரிபார்க்கலாம்?',
            dv:'ތިބާގެ ރަހުމަތްތެރިން ރަނގަޅުތޯ ބަލާނީ ކިހިނެއް؟',
        },
        addResource2:{
            en:'How to have a difficult conversation and get the desired end results',
            si:'දුෂ්කර සංවාදයක් පවත්වා අපේක්ෂිත අවසාන ප්රතිඵල ලබා ගන්නේ කෙසේද',
            ta:'கடினமான உரையாடலை நடத்துவது மற்றும் விரும்பிய முடிவைப் பெறுவது எப்படி',
            dv:'އުނދަގޫ ވާހަކައެއް ދައްކައިގެން އެދޭ ނަތީޖާ ނެރޭނީ ކިހިނެއް؟',
        },
        addResource3:{
            en:'Affirmation and self-help, meditation and mindfulness',
            si:'තහවුරු කිරීම සහ ස්වයං උපකාරය, භාවනාව සහ සිහිය',
            ta:'உறுதிப்பாடு மற்றும் சுய உதவி, தியானம் மற்றும் நினைவாற்றல்',
            dv:'ޔަގީންކަން އަދި އަމިއްލަ ނަފްސަށް އެހީވުން، މެޑިޓޭޑް ކުރުމާއި ވިސްނުން ބެހެއްޓުން',
        },
        addResource4:{
            en:'How to get involved in volunteering',
            si:'ස්වේච්ඡා සේවයට සම්බන්ධ වන්නේ කෙසේද?',
            ta:'தன்னார்வத் தொண்டுகளில் ஈடுபடுவது எப்படி',
            dv:'ދަރުމައަށް މަސައްކަތް ކުރުމުގެ ތެރެއަށް ވަންނާނީ ކިހިނެއް؟',
        },
        addResource5:{
            en:'How to cope if you have social anxiety, how to build confidence',
            si:'ඔබට සමාජ කනස්සල්ලක් ඇත්නම් එයට මුහුණ දෙන්නේ කෙසේද, විශ්වාසය ගොඩනඟා ගන්නේ කෙසේද',
            ta:'உங்களுக்கு சமூகத்தில் ஆத்திரம் இருந்தால் அதனை எப்படி சமாளிப்பது, நம்பிக்கையை வளர்ப்பது எப்படி?',
            dv:'ސޯޝަލް އެންޒައިޓީ ހުންނަނަމަ އެކަމާ ކުރިމަތިލާނީ ކިހިނެއް؟ އަމިއްލަ ނަފްސަށް އޮތް އިތުބާރު ބިނާކުރާނީ ކިހިނެއް؟',
        },
        addResource6:{
            en:'How to make a difficult decision. And then follow up on specific decisions e.g. subject to study, career to choose',
            si:'දුෂ්කර තීරණයක් ගන්නේ කෙසේද. ඉන්පසු නිශ්චිත තීරණ ගැන පසු විපරම් කරන්න උදා. ඉගෙනීමට යටත්ව, තෝරා ගැනීමට වෘත්තිය',
            ta:'கடினமான தீர்மானங்களை எடுப்பது, மற்றும் எடுத்த தீர்மானங்களுக்கேற்ப நடப்பது எவ்வாறு? உதா. கற்கும் பாடங்கள், தேர்ந்தெடுக்கும் தொழில்?',
            dv:'އުނދަގޫ ނިންމުމެއް ނިންމާނީ ކިހިނެއް؟ އަދި އޭގެން ވަކި ނިންމުމެއް ބަލާނީ ކިހިނެއް؟ މިސާލަކަށް، ކިޔަވާނެ މާއްދާ، ޚިޔާރުކުރާނެ މަސައްކަތުގެ ދާއިރާ',
        },
        addResource7:{
            en:'Mental health, dealing with depression, anxiety, loneliness, disempowerment, frustration',
            si:'මානසික සෞඛ්‍යය, මානසික අවපීඩනය සමඟ කටයුතු කිරීම, කාංසාව, තනිකම, බල ගැන්වීම, කලකිරීම',
            ta:'உள ஆரோக்கியம், மனச்சோர்வு, பதட்டம், தனிமை, வலுவூட்டப்படாமை, விரக்தி ஆகியவற்றைக் கையாளுதல்',
            dv:'ނަފްސާނީ ސިއްހަތު، ޑިޕްރެޝަނާ ކުރިމަތިލުން، އެންޒައިޓީ، އެކަނިވެރިވުން، އަމިއްލަ ބާރު ނެތްކަމުގެ އިހުސާސް، ހާސްވުން',
        },
    }

    document.getElementById('links-email-input').placeholder = langTexts.emailPlaceholder[langId]
    document.getElementById('additional-resources-grid-header').innerText = langTexts.moreResources[langId]
    document.getElementById('additional-resources-list-header').innerText = langTexts.additionalResources[langId]
    document.getElementById('links-email-submit-button').innerText = langTexts.submit[langId]
    document.getElementById('additional-resources-list-item-text-1').innerText = langTexts.addResource1['en']
    document.getElementById('additional-resources-list-item-text-2').innerText = langTexts.addResource2['en']
    document.getElementById('additional-resources-list-item-text-3').innerText = langTexts.addResource3['en']
    document.getElementById('additional-resources-list-item-text-4').innerText = langTexts.addResource4['en']
    document.getElementById('additional-resources-list-item-text-5').innerText = langTexts.addResource5['en']
    document.getElementById('additional-resources-list-item-text-6').innerText = langTexts.addResource6['en']
    document.getElementById('additional-resources-list-item-text-7').innerText = langTexts.addResource7['en']

}

function updateResultLinks(loc){
    const langTexts = {
        linkTop:[
            {
                en : 'How to cope if you have social anxiety, how to build confidence ',
                si : 'ඔබට සමාජ කනස්සල්ලක් ඇත්නම් එයට මුහුණ දෙන්නේ කෙසේද, විශ්වාසය ගොඩනඟා ගන්නේ කෙසේද',
                ta : 'உங்களுக்கு சமூகத்தில் ஆத்திரம் இருந்தால் அதனை எப்படி சமாளிப்பது, நம்பிக்கையை வளர்ப்பது எப்படி?',
                dv : 'ސޯޝަލް އެންޒައިޓީ ހުންނަނަމަ އެކަމާ ކުރިމަތިލާނީ ކިހިނެއް؟ އަމިއްލަ ނަފްސަށް އޮތް އިތުބާރު ބިނާކުރާނީ ކިހިނެއް؟'
            },
            {
                en : 'How to make a difficult decision.',
                si : 'දුෂ්කර තීරණයක් ගන්නේ කෙසේද',
                ta : 'கடினமான முடிவை எடுப்பது எப்படி',
                dv : 'އުނދަގޫ ނިންމުމެއް ނިންމާނީ ކިހިނެއް؟'
            },
            {
                en : 'How to talk to friends to check if they are doing OK',
                si : 'මිතුරන් හොඳින් ක්‍රියා කරනවාද යන්න පරීක්ෂා කිරීමට ඔවුන් සමඟ කතා කරන්නේ කෙසේද',
                ta : 'நண்பர்கள் நலமா என்பதைச் அறிய அவர்களுடன் பேசுவது எப்படி',
                dv : 'ތިބާގެ ރަހުމަތްތެރިން ރަނގަޅުތޯ ބަލާނީ ކިހިނެއް؟'
            },
        ],
        linkLeft:[
            {
                en : 'Mental Health Care',
                si : 'මානසික සෞඛ්ය රැකවරණය',
                ta : 'மனநல பராமரிப்பு',
                dv : 'link left loc 0'
            },
            {
                en : 'Mental Health Care',
                si : 'මානසික සෞඛ්ය රැකවරණය',
                ta : 'மனநல பராமரிப்பு',
                dv : 'link left loc 1'
            },
            {
                en : 'How to get involved in volunteering ',
                si : 'ස්වේච්ඡා සේවයට සම්බන්ධ වන්නේ කෙසේද?',
                ta : 'தன்னார்வத் தொண்டுகளில் ஈடுபடுவது எப்படி',
                dv : 'ދަރުމައަށް މަސައްކަތް ކުރުމުގެ ތެރެއަށް ވަންނާނީ ކިހިނެއް؟'
            },
        ],
        linkRight:[
            {
                en : 'Self Confidence',
                si : 'ආත්ම විශ්වාසය',
                ta : 'தன்னம்பிக்கை',
                dv : 'link right loc 0'
            },
            {
                en : 'Volunteering opportunities',
                si : 'ස්වේච්ඡා අවස්ථා',
                ta : 'தன்னார்வ வாய்ப்புகள்',
                dv : 'link right loc 1'
            },
            {
                en : 'Mindfulness and meditation',
                si : 'සිහිය හා භාවනාව',
                ta : 'நினைவாற்றல் மற்றும் தியானம்',
                dv : 'link right loc 2'
            },
        ]
    }
    const links = {
        linkTop:[
            "https://www.nhs.uk/mental-health/conditions/social-anxiety/",
            "https://hbr.org/2015/11/3-timeless-rules-for-making-tough-decisions ",
            "https://www.nytimes.com/2020/07/28/smarter-living/coronavirus-how-to-check-in-with-a-friend.html",
        ],
        linkLeft:[
            "https://www.mentalhealth.org.uk/your-mental-health/looking-after-your-mental-health",
            "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
            "https://www.unv.org/",
        ],
        linkRight:[
            "https://www.nytimes.com/2019/06/03/smarter-living/how-to-improve-self-confidence.html ",
            "https://www.unv.org/ ",
            "https://news.harvard.edu/gazette/story/2018/04/less-stress-clearer-thoughts-with-mindfulness-meditation/",
        ],
    }

    const locValue = loc

    const topLink = document.getElementById('resource-link-top')
    const leftLink = document.getElementById('resource-link-left')
    const rightLink = document.getElementById('resource-link-right')


    topLink.innerText = langTexts.linkTop[locValue]['en']
    leftLink.innerText = langTexts.linkLeft[locValue]['en']
    rightLink.innerText = langTexts.linkRight[locValue]['en']

    topLink.href = links.linkTop[locValue]
    leftLink.href = links.linkLeft[locValue]
    rightLink.href = links.linkRight[locValue]

}

document.getElementById('links-email-submit-button').addEventListener('click',function(){
    const email = document.getElementById('links-email-input').value.toLowerCase().trim()

    if(email === ''){
        alert("Email field is empty!")
        return
    }

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //validate email
    if (re.test(email)){
        submitEmail(email)
    }
    else{
        alert("You have entered an invalid email address!")
    }
})

async function submitEmail(email){

    try {
        const docRef = doc(db,"answers",docId)
        await updateDoc(docRef,{
            email:email
        })        
        console.log("updated document");
        setEmailSubmitIndicatorText('success')
    } catch (e) {
        console.log("error updating document", e);
        setEmailSubmitIndicatorText('failed')
    }
}

function setEmailSubmitIndicatorText(message){
    const langTexts = {
        success:{
            en:'email submitted',
            si:'ඊමේල් ඉදිරිපත් කරන ලදී',
            ta:'மின்னஞ்சல் சமர்ப்பிக்கப்பட்டது',
            dv:'email submitted',//Note - Unfinished Translations
        },
        failed:{
            en:'failed to submit email',
            si:'ඊමේල් ඉදිරිපත් කිරීමට අපොහොසත් විය',
            ta:'மின்னஞ்சலைச் சமர்ப்பிக்க முடியவில்லை',
            dv:'failed to submit email',//Note - Unfinished Translations
        }
    }

    const emailSubmitIndicator = document.getElementById('links-email-submit-indicator')
    emailSubmitIndicator.innerText = langTexts[message][langId]

    switch(langId){
        case'en':
            emailSubmitIndicator.style.fontSize = '1em'
            break;
        case'si':
            emailSubmitIndicator.style.fontSize = '0.8em'
            break;
        case'ta':
            emailSubmitIndicator.style.fontSize = '0.6em'
            break;
        case'dv':
            emailSubmitIndicator.style.fontSize = '0.8em'
            break;
    
    }

    switch(message){
        case 'success':
            emailSubmitIndicator.style.color = '#cbfa01'
            break;
        case 'failed':
            emailSubmitIndicator.style.color = '#ff2b2b'
            break;
    }
}