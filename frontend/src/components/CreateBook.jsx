import { useState } from "react";
import "../styles/components/Createbook.css";
import { validateProduct } from "../utils/validateProduct/validateProduct";
import axios from "axios";

function CreateBook({ checkCreate, onAdd }) {
  const [valueName, setValueName] = useState("");
  const [valuePrice, setValuePrice] = useState("");
  const [valueQuantity, setValueQuantity] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueCategory, setValueCategory] = useState("COMIC");

  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    const newProduct = {
      name: valueName,
      price: valuePrice,
      quantity: valueQuantity,
      description: valueDescription,
      category: valueCategory,
      imgBase64:
        "89504e470d0a1a0a0000000d4948445200000179000001f40806000000d82d5d3b0000200049444154789cedddc9739b797edff10f0062df487027b84adc4449dd5277cfb4a7b7f138aef2b8e26b2ef63fe0544e998bff065fe2536a724fc5979c5371ca710e9e76b9aba7a7b5b444addc0971034910c4bee64082566f6a4a2208f0cbf7ebd22d92c0f32309bcf9c383e7f93d8e7abd5e97a47abdaefff1bf9feaefffe1a9fedb7fbe2100c0c5f2d77ff7407ff9eb69fdd59f4fcbe17048921cf57abdbeb59bd37ffadb7fd67ff98f332d1e2200e06dfde6b74ff45fffe633f57707e4a8d56af5fff037ff87c0038021bff9ed13fdcfbffd3339fefbff7a5cffec9aa7d5e301009cb17f7e5492f3efffe169abc701006882bfff87a772ac2c2ed65b3d10004073385b3d000040f3107900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c0b08e566edce170b472f300f046eaf57aab87706acce401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f008611790030aca3d503c0ebc9e7f37afaec996af5ba3a5c2e054221b93b3ae47038e4f5f9e4ee38fa9576b8dd723a1caa56abaa56abaad5eb2a140aaa55abaa542acae572aad56a2a974af2fbfd1a1d195130186cf17707e0ac39561617eb2ddbb8c3d1aa4db7ad478f1ea9542e2bd6ddad4030288fc72397cb25e7f1cfcae174caeff72be0f7abc3ed564747879ccea317644ea7f3e4ff5d2e9724a95aad9edc77ad5653ad569324552a15d56a35954a25e57239158b45d58f3f57ad5655ae5474984e6b3799544f77b7868787cfed678057dbdfdfd7d2f2b2dc6eb722d1a842e1b03c1ecfb71e23ce533cb76af5a3a77ebd5653ad5e57b150502e9753269351219f97c7edd68d1b379afabd5c54f57acbb2f9da887c0b64b3593d79fa54c150489d9d9d0a048327510e04028a4422f2f97ceae8e838f9f879ab1ecff80b8582767777552e9755ad56954ea7b5b3bdad5857974647465a32b6cb627d7d5dc9dd5df5f4f62adad979f25870b95c0a06830a8542f2783c67f63869fcce1bbff75c2ea75c2ef7adcfe7f379a5f6f7757878a8c181010d0d0ebef5762f22227fda8d5f82c83782de158ba92b1693fbf809d9d9d5a54020208fc723b7dbddea619e5ab95c562e97d3eeeeae4ac5a2d2e9b45ebc78a1b19111f5f4f4b47a7817563a9dd6f38505f5f6f5291a8daac3ed96dbed567777b7028140db3c46cae5b22a958a32998c0e0f0f552e9755afd554ae54943e38503299547f6fafe2f178ab87da5444feb41b3718f96432a99ddd5df5f5f7cbe7f5cae1742a168b291289b47466de2ce57259a9544aa9fd7de5f379adafaf2b1408686262a2d5436b7b4b4b4bcae6f38ac7e3f2fbfd0a85c38ac562f27abdad1eda6b6bbc0ac86432dadfdf57a55c56a954523299d4613aadf76edf6ef510cf14913fedc60d46feceddbbfad9871faaafafcf5cd07f4ab55a552e97d3cece8e0e5229adacac687c6c4cddb158ab87d6369e2f2ca8542e6b787858fe4040bdbdbd0a0402261f2bd56a55a55249a9544a07a9946af5bab2998cb6b6b63479e5ca857ea3ff22459ea36bce58bd5e97cfeb35f9a4fd292e974be17058e17058d56a5543f1b852a99496565694cf66353737d7ea21b6c4f6ce8ed6d6d7353636a6b18909f5f7f75fe8c09d96cbe592dfef97dfefd7e0f1befb72b9accdcd4dddf9c31f74fbd6ad168ff07220f2680a97cba5fefe7ef5f7f76b7c7c5c1b1b1b5a7ff142bbc9a4aecdcecae3f1b47a884df7ecf97355aa558d8d8febe34f3e512c16bb947ffc5fe676bb150a064f8eec41f31179349dd7ebd5f8f8b8e2f1b8365ebcd04e32a9f5b5355d9b9991dfef6ff5f0cedcfcfcbcfcc1a0c6af5cb934b376b42f228f73e376bb353a36a6f8f0b0060606b4b2bcac83fd7d33c76237e23e3337a7c1c1c10bf9062aec21f238772e974bf1785c3d3d3ddad8d8d083f979f9bc5e4d5ebddaeaa1bd91e5e5651d1c1e6aeefa75c5e371e28eb642e4d1328ddd38dddddd4aacafebeb3b77746d76f6c2ecc2d9dfdfd7e2f2b2666767f5ceeddb8a46a3ad1e12f03d441e2d170e8735353dad7024a2f9870fa57a5db33333ad1ed62b3576cd7cf8477f7472e408d08e883cda4263174e6767a7d6565775e7ee5d5d9f9b6bbba3701a67a6ce5dbfaee191910bf3aa03971791475b0906839a9a9e563014d2d75f7da5e1e161f5f5f6b67a58928e0e892c95cbfae0e73f377fda3eec20f2683b2e974b232323f2783cba7be78e0e0e0e343539d9d231ddffe61bf50f0c68667656e170b8a563015e07170d41dbeaefefd7471f7f2cafcfa7070f1fb6640ca5524977eeded5f4cc8cdebd758bc0e3c221f2686be17058efbdffbe06060775effefd73dd76a954d2c3f979ddba7d5b57ae5e6d9b952081d741e4d1f6fc7ebf6edcbca92b9393ba7befdeb96cf3e5c08f8e8d5dfae508707111795c086eb75b3333339a9a9e6e7ae8bf1b78e02223f2b8305c2e97a6a6a7357ee54a5343ff707e5eefdcba45e0610291c785e272b9343b3babee9e1ecdcfcf9ff9fddfbd774fd7e6e6343e3e7ee6f70db40291c785e376bbf5eead5baa495a5d5b3bb3fbbd77ffbec6af5cd1950bba860ef043883c2ea46030a80f7ef633259349954aa5b7bebf478f1ea9b3ab4bb3b3b3bcc90a53883c2eacdede5e5dbf79530fdf72b7cdeede9e0aa592debd758bc324610e91c785363131a15877b71e3d7efcc6f7b1babaaaf73ff880139d601291c785e672b9f4eead5bcae5f36f74fb6f1e3c507c6484b568601691c785170e87e578c3db96cae54b7b81715c0e441e979a4362b9609846e401c030220f0086117900308cc8038061441e000c23f20060d8a5bcc6ebdd7bf7140c85e4f1782449b55a4df97c5ef55a4dd76667e574f2b70f800d972af2df3c78a05038ac8f3ef9449148e4649d926ab5aa52a9a4e7cf9f6bfef1634d5dbd2aafd7dbe2d10278954c26a3a7cf9ec9e7f7cbebf349f5ba72d9ac2a958a6edfbad5eae1b58d4b13f97bf7ef6be2ca155dbf71e37b9f73b95cf2fbfdba79f3a6c6c7c7f5d5ef7faf91789cd0036da852a9e8fe37dfa8b7af4fefdebeaddede5ef97c3e4947e1dfdcdcd4c2f2b2aae5b2a6a7a65a3cdad6bb34fb25ae4c4efe60e0bf2b1c0eeb934f3fd5c3f9f93359c216c0d9695c9af1facd9bfae8e38f353e3eae60302897cb2597cba56834aa9999197dfae9a78a7577ebeb3b775a3de496bb1491bfffe0c16bad4fe276bbf5c1cf7fae72b9dcc45101781db55a4d0b0b0bfac5c71f6b7272f2955feb72b974fbbdf73477fdfa398dae7d5d8ac87ff4d147af7d9b783caeeded6dd56ab5268c08c0eb2a168beaeeeb537777f7a96f33353dddc4115d0c9722f29168f48d6e97ce6498cd036da256abe9166fa8beb64b11f937bd9cdbc4c4842a95ca198f06c0ebaa542a7abeb0c0a519dfc0a588fc9bf20702ad1e02001d1de6dcc1a519df089107d0f66ab59a82c160ab877121117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f133c5eaf5e6c6cb47a1840db21f230c11f08289bcdb67a1840db21f2006018910700c3883c001846e47169e5f379391c8e560f03682a228f4b6b7777575e9fafd5c3009a8ac8e3d2ca170a441ee6117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117998d0e172a95aadb67a1840db21f23021140eab582cb67a1840db21f230c1eff7ab56abb57a1840db21f2006018910700c3883c001846e401c030220f008611795c5ab55a4d4e2eff07e3883c2ead52a9a46028d4ea61004d45e47169552a15050381560f03682a220f0086117900308cc8038061441e000c23f2006018910700c3883c4c70bbddaad7ebad1e06d076883c4cf0fbfdad1e02d096883c4cf0783cad1e02d096883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c2ead7abd2e1f67cac238228f4b2d180cb67a084053117900308cc8038061441e000c23f20060189187091d1d1dad1e02d096883c4cf0783ce2ba50c0f7117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2b8d43a5cae560f01682a228f4bab2e718d579847e401c030220f0086117998e074f250067e08cf0c98d0d1d12147ab0701b421220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f200601891c7a5c612c5b0aea3d503c0d9ab56ab92a45aadf6bdcf7d376aae4b7c8d53878e9628be481abfdb4aa5a252a9a442a1a06c36ab423effcadb399c4e79bd5e058341f97c3e757474a8a3a3434ea7f3523f062e838bf508bfc4aad5aa6ab59a0a858272b99cd207074a2693274ffa867abdae7abd7e729bef72389d723afe6de57587c321c7f1bf1d0e87c2e1b03a3b3b150c85e4f3f9e4f178e476bb9bf89d9d0d6ba12a97cbcae572dad9d951329954a55c3ef9ddd6ea7555ca65954a25552a15d56bb59ffcfe6bb59aeaf5ba1c4ea7dc6eb79c4ea73c1e8f1c0e875c2e971c0e879c4ea7a2d1a862dddd8a4422f2f97ce67eae9711916f438d27f8f6d6d649c86bb59a2a958a8ac5a24aa5921c92ae5eb9a248247266db2d168b5a5c5ad2d2e2e25104bc5e79bdde9308f80301f5f5f529168b5d98f85f04e57259a9544a9b9b9b3a48a554afd755ad5695cb66552e97353636a6ee8181a68f239bcd6a697959cf9f3d93cfef97d7e75387cb2597cba59e9e1ef5f5f72b1008f07bbf60887c1bc8e7f3dad9ded68b8d0d55cae593c8572a154d4f4e2a140a9dcb38bc5eafaecdcefee8e7979797f587d555f97c3ef9fc7e75b85cf27abd1a181c545f5f9fbc5eefb98cf3a2ab56abcae5724aacaf2b994caa542a2993c9c8eb766b6e6eae65e30a0683ba71fdfaf73e9ec964f4687e5ecf9e3d53201090c7e3512814d2c4952b0a0402ccf6db1c916f8172b9accdcd4d25120955ca65e5f379e5b2594d5ebd7aa633f3b3363e3eaef1f1f16f7d6c6b6b4b7ff8ea2b858e77ef0483410d0c0e2a168b11fd97148b456d6f6f6b736343854241994c46b56a55efdcbcd9eaa1fda45028a4dbb76e9dfcbb542a69796545ebebeb0a87c3727b3c1a1818503c1e6796df8688fc39c9e7f35a5a5ad2412aa542a1a08383034db579d44fa3bfbf5ffdfdfd27ff5e595dd5975f7ca1702422afd7abae584c2323239772c657ad56b5bdbdadf5b5356532191d1c1c68786848e3a3a3ad1eda5bf1783c9a9e9a3af9772693d1bd3b77b4bcbc2c9fcf47f0db0c916fa262b1a88585051da452ca66b32a178b9a9a9a323dc31d1b1dd5d84b117bf0e081569697158944d4d7d7a7e19111f9fdfe168eb0f9b2d9acd65657b5b3b3a3bddd5dc587863479e54aab87d534a15048efddbe2de9e87b6f043fe0f76b6474547d7d7d97ee0f7c3b21f267cce170687b6747cf9e3d53269351319fd7f4f4b43c4343ad1e5a4bdcb871e3e4ffefdebba7e5e56545a3510d0c0ca87f60c0cc1fbcc6ac3db1beaedddd5d954b25bdfbce3b177ed6feba82c1e049f033998cbefce20bf5f4f62a180ae9dab56b667edf1709913f63b1584c8fe6e7353335a5c197766340baf5eebb928e9efc77befe5ad1ce4e45a3510dc5e3eae9e9b990b3bd7c3eaff5b5356d6e6e9eccdae75ef1e6f565d298e1d76a35adadafebf3dffd4e914844fdfdfd72fcf4cd714688fc19fbeeee0a7cdfcb2fef5f6c6ce88b7ffd57f51fefc71d1818b810fb728bc5a212898416171694cfe574ebdd772fddacfdb49c4ee7c973229d4eebfebd7b0a87c32d1ed5e541e4d1524383831a1a1c542693d1d75f7da5ae584c43f1b8e2f1785beebb2f97cb4a24125a5e5ad2c1c181de7be9a813fcb44824a277df79a7d5c3b85488fc0592cfe795cd6695cde5542a958ece62acd5543ffe7ce34cd71fe378e94c57a7c321a7cba50e974b7ebf5fa150488140a0656bb9bc3cbbbf7bef9e565756343434a4f8f0705bccfacae5b2365ebcd0eaeaaa7693c993b102ed8ec8b799743aadfde3c32c1ba7a24b47012f140a72ba5ceaeeeed6503cae7024a2502874b2fe8ac7e379e57d974aa593ffcfe5723a3838506a7f5fc96452eb2f5ec8ebf1c8e5744ac74b1d3824b93a3a140c06d57d8ec7bd37f6ddcfcfcf6b6969498343431a1919517777f7b96cff65d56a559b9b9b5a595ed6cef6b66e5cbfaeb19191731fc7ab944a25edefefab582a1d9d4c57a99c7caefe03eb1735388effa037963470bbddf2fbfd0a06020a06834d1f37ce07916fa16432a9743aad52a974341bafd7952b14d4d7d7a76bd7af9f2c1f70566f48bebcaf3b180caab7b7f747bfb671d6ede6e6a6969796b4b9b929bfcf27391c723a1cf27abdeae9e969eaecbf71f6e7fafabafee5f3cf353d3dad91d1d1730bd0fede9e969797b5b2b2a299a9298dc4e3e7b2ddef2a168b4a2693cae5f3aa55abaa355eb11dffb7502ccad5d1a14824a2586faf3a3b3b251d2dbe1608047e7011b64aa572725675bd56532e97d3dede9e363637552997e5f7fb8fde1c6dac6b24c9e97229e0f7abb3b3f3dccec2c6db23f2e7a452a968737353b95cee64865e2c9574756a4a6363636d377372bbdd8a46a38a46a39a999939f978b55a552693d193c78ff5e4e9d3a345ac9c4e395d2e45c2617575759df98c7f787858c3c3c37af0f0e1517067679b7ab24d63bffb836fbe51341cd6fbe7b46ba652a9e8209dd6412aa572b97c14f37a5df94241a17058a3a3a367ba7e4c341a3dd5d755ab55150a05ed26935a5c5ad293a74f15f0fb8f5ef1e9e8d55e3814524f4fcf855bd5f332e037d244fbfbfbdadddb3b5a31b05c563812d13bb76fabb3b3f3421c41f2435c2e97a2d1a87efee187271f2b97cb4a2693ba7fef9e36363715f0fbe576bb8f56330c87cf6ca6df5857e5ceddbb4aacaf6b7c6242030303677ae8e5fede9e1616169448249afea66a369bd5cececec9fb2be54a45e54a453333331a191d6d9b55205d2e9782c1a082c1a046c7c6bef5b962b1a88d8d0d3d7ef448db3b3bf2b8dd721cbfd28bc56217fe8c6e0b88fc194b2412ca66b3aad66acae7f3ba7ef3a6c6c6c62e6cd44fc3ed766b707050838383928e9ef84b8b8b7afcf8b1fc5eaf3a1abb128e773fbdaddbb76e2993c9e8f75f7ea9b1b1318d8e8dbdf5fefac61babf7efdf57341c6e4ae04ba592f6f6f6943e3c3c59a46c786444efdcbead5028d416417f5d5eaff75b6b1a35beafe7cf9ee9d9c28202c70bd9050201f5f7f733d36f017ee26760737353878787aad66a727b3c7aef830f1489462fe493f62c78bd5ecd5ebba6d96bd7241dcd8ebffcf24b6d6e6d29100828120ebf75f043a190debf7d5b894442fff2f9e79a788b65034e66efebeb677ed44c26933999ade70b0579bc5e7df0b39fa9b3b3d3e4e3c3e572291c0eebf67befe9f67befa95aad2a954ae99bfbf7f5e8f16379dc6eb9dd6ef5f5f5b15fff9c10f937944c26954aa554ad5655add74d3f71df56572ca63ffbf5af259d7df0e3c7c7d42712090dbcc19aebcf9e3ed5f3e7cf8f66ef6714f846d8cbe5b232d9ac6666673571e5caa53ca5df757c34d81fffea57928e5e312d2e2eead1c3870a058327af02dbf19c082b88fc6ba8542a5a5f5f3f99957df88b5f28168b11f6d7f063c18f4622ea3ebe22d19b88bfc1912f914844eb6b6b7af70c96fbcd66b34aeeeeaa582c2a93c9686a6646535353a677d3bd09b7dbad999919cdcccca85aad6a716141f3c7c1f7783c1a1a1a3a935d7af83744fe14d2e9b4b67776542814343c3aaab9b9b9730bfb772ffb572c14942f1494cfe75f790cf477f9fd7e79bc5e85c3e16f5de3b395117a39f8cf9f3fd7836fbe51381452341251575757d39fec9357afbed5ed1bc7a7a70f0f954ea7353236a69f7df8e1a59cb1bf0997cba5a9e9694d4d4fab5c2eebe993277af4f8b1828180c2e1f0b796b0c69b23f2afe076bbf5ecc913e50b057dfcc927af3caefc6dbd7c4dcf5c36ab5abdaefa4b97fc7bf962cdc16050a3afb964efd2d2920ed269d56a3579bcdea3ab3bf97cf278bd723a1c72389df21f1f031d8944cef4f8fcd3989c9cd4e4e4a4b2d9ac3effddefb4b5bdad6834aaee58acedf6dd663219edeeede9e0e0404e974b9f7cfa695b9c952b1d4d0a2a95cad185be8b4595cae5a3b3a4b3d91fbce66f83d3e190dfef97d7eb95d7e793c7ed5687db2d9fcf772e17fb76bbddba7ee386aedfb871f2183848a7e571bb35744957703d2b8e95c5c5579f0bdfcc8d3bce672dba91ef5ccde8b4cae572531ee08d2310b6b6b6943b7ef2150a05a55229397434c36cc56cf0f9c282d2e9b422d1a8c2e1b03adc6e793c1ef5f6f62a727c1190f352ad56f5f0c1032d2d2e2ad6d5d5f2c3f16ab59af6f6f6943a38503a9dd695c9c9737d45f7b2c6e32593c928954a297ffcc7bf5aadaa5aa9a8542aa95028a890cfab5aadcaed766b381e575757d78fde673e9fd7caeaaa72b99cead2c9abbc5028f46fd7f93dbe087c201854575797229148535f0956ab553d79f2448bcf9fcbe7f52a180eeb171f7df4daf7b3b6bc7ce663fba92544da09913f27f97c5e5b5b5b3a3c3c54219f5732999453d2d51605fdb4128984b6b6b715ebee3e7ac2fb7ceaeeee566767e7b98d7b717151f7efdd53acb3535db1983a4f7912cf5968ec92d9dbdb53a952d1a79f7d76ea9388ce42b55a3d39f432b5bfaff2f10c3d9d4e2b93c9281a89bcf56ea7d7512c16b5b8b8a842a9a49e9e1ef9fd7eb95c2e797d3ef5f4f4342dfcd96c56bbc9e4f78ed33f0d224fe49ba25aad2a7d70a0172f5ea85ca9687f6f4fd94c46b333336d1df59f924c26b5b2b6a69e9e1e85c261050381a327f7391c32bab1b1a12fbff8429dd1a8a29d9deaeaec6cda920ac56251fbfbfbda4926e5eae8d067bffce5b91c01d288facef6b652a9944aa592d2e9b40ed3695db972e55cffc09d56a55251e2c50bededefabb7b757c1e33751fbfbfbdbe25062224fe4cf4ce394fff5b535954a252512094d8c8d993eeb6f696949e9c3430d0c0eaab3ab4bbdbdbd4d3fb1677f6f4f9fffee770a1d9f4a7f96e1cbe7f3dadbdbd34e32a97024a28f3ff9a4e96f4e97cb65a55229ed2693cae7f3dadfdf57e6f0f05b17cfbe486ab59a767676b4b9b5a581c141797d3ef9fd7e8d8c8cb4648243e489fc5b6b5cd3339fcf2b9148e8eac444dbbd59781e9e3e7ba662a9a4c1c141453b3bd5dbdbdbd43724138984befaf24bf5f4f428d6d5f5563ff3c6ccfdc5c686068786f4fe071f34f50f55b95cd6dede9e767777954ea7b5b5b1a1d19111f5f4f4346d9bad52a954b4b0b828cff185dd83c1a0e2f1f8b9059fc85f82c80f8d8c34e5cdd36432a9dddd5d6dbc78a16838acdedede96adc7de6ee6e7e725a753838383ea1f18502c166bda8cf8c993277a343faf81be3ec562b1d7daad522a95943adead168e46f5e9a79f362deedf0dfbe6c686aeb6e92e986629954a7afefcb94291883a3b3b150e87353834d4d4574b44fe1244bec3eb3d5957e56d158b45adaeac289bcb6979694973b3b39cadf70ac562510fe6e7158fc7d5dbd777b2cfb619befafdef95585fd7c4f8f82b8f24918e7629eca752dad8d85087dbadcf7ef9cba6cd2c0f0e0eb4b3b3a36432a9cd8d0d4d5dbd6a7a17de69954a253d7ef2447dfdfd0a87c34d5b469ac85f82c8dfb9774ffffe2ffee2ad6668f97c5e2bcbcbdadbdb53bd56d3703cceacfd353d7af44875874323a3a3eaefef6fca3210878787fa7ffff44f9a9e9cfcd1dd378dd51f0f0e0ff5ab3ff993a684a5316bdfdeded6daeaaa428180262626ce7c3b56643219adaeaf6b6474545d5d5deaebeb3bb3c70691bf049197a4d4e1a16ebec1e9eb8db8271209c50707db6eddf78b289d4eebf9e2a226262634383474e64b43dcbf774f2bcbcb2757987a59b158d4c3f9794d4e4de9fa8d1b67b6cd86c61f909ded6dbd4824747d6eee421f4d75de4aa592be79f850e3c7ef6b9dc50aae44fe92447e7b67473ebf5f935353a77ad2e5f379adaeae6a7d6d4d236d7a51e98baeb12b67647454c3c3c367b6dffeeeddbb5a5f5dfdc10b463f79fa545e9f4f9f7ef6d95b6fe765878787dadadad2d2e2a2ead5aaae1dafc0893753abd5b49e489cbc59fba6b1dfd8d850a5583cf3f111f9d36efc1c23dfb0bcbaaadede5e453b3bd5d9d979b23e8acbe53a591635994c2ab1beaee1a121e27e4ebebe734743f1b846c7c6de2af6d96c56fff71ffff14777d7dcbb7f5fc3a3a3ba754687271e1c1c687b6bebe8cdc440e0645d759c8d5aada6172f5ec8edf52ad6ddad919191533d365e5efcac19175d27f2a7dd780b22dff0f59d3b8a76762a1a8dcae3f1c8e1742a9fcf6b7d6d4d37e6e65809af45bebe7347c3a3a31a1d1d7deddd38bbbbbbfac3575fc9e5746a7a6aea07bf267570a0a5e565fdbb3ffdd3b7daf5767070a0cdcd4d3d7bf244fd7d7d6fb4cc314eefe5d847a3510dc5e3dffbfdbdbc5c483e9f57a950505f93d69b22f2a7dd780b238ff6d5d88d333535a5a1a12175c562affcfac3c343edeeeeeade9d3ba73a2bf4d1a347727bbd7aeffdf75f7b8982c3c3436d6e6ce8c9e3c7c4bd45f6f7f7b5b1b5a591d1d1934940e34ce1cd8d0df5f6f4342dee0d44feb41b27f27885ddbd3dadaead696676f664ebfdcf6b000003dc4944415481b28e8e0ed56a35e572391da452ca170a5a5c5890cfeb7dad355c12898492bbbbbafdfefbeae9e9f9c9f7691a6ba73c7cf890dd3220f2a7de3891c729eceeed696565453dbdbd0a04022a964a4aeeec28e0f76b6a72f2adeefb9b070f148e4434323aaa6824a250387cb2cfb7b1dae3dede9e9e3c7eac5ab5aa6bb3b367f12de18223f2a7dd3891479b68acb639148f2b1c0ecbe174aa522e2b9148a85ead6a6e6eaed543441b21f2a7dd38910770015da4c873ca26001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c0b08e566ebc5eafb772f300601e337900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c001846e401c030220f0086117900308cc8038061441e000c23f2006018910700c3883c0018e6fcebbf7bd0ea3100009ae0afffee819c7ff9ebe9568f0300d0047ff9eb6939ffeacfa7f59bdf3e69f558000067e837bf7da2bffaf369fd7fd53eea99625365770000000049454e44ae426082",
    };

    const validationErrors = validateProduct(newProduct);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        newProduct
      );
      onAdd(response.data);
      alert("Success add new book");
      checkCreate(false);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("An error has occurred");
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setValueName(newName);

    if (!newName || newName.trim() === "") {
      setErrors((prev) => ({ ...prev, name: "Product name cannot be empty" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setValuePrice(newPrice);

    if (newPrice < 0 || newPrice > 999999999) {
      setErrors((prev) => ({
        ...prev,
        price: "Product price must be between 0 and 999,999,999",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.price;
        return newErrors;
      });
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setValueQuantity(newQuantity);

    if (newQuantity < 0 || newQuantity > 99999) {
      setErrors((prev) => ({
        ...prev,
        quantity: "Product quantity must be between 0 and 99,999",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.quantity;
        return newErrors;
      });
    }
  };

  const handleDescriptionChange = (e) => {
    const newVal = e.target.value;
    setValueDescription(newVal);

    const descToCheck = newVal ? newVal.trim() : "";

    if (descToCheck.length > 500) {
      setErrors((prev) => ({
        ...prev,
        description: "Product description cannot exceed 500 characters",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.description;
        return newErrors;
      });
    }
  };

  return (
    <>
      <div className="create">
        <div className="create-header">
          <div className="header-title">
            <img
              src="/add-title-img.svg"
              alt="add-title-img"
              className="title-img"
            />

            <div className="title-text">Add New Book</div>
          </div>

          <div className="header-buttons">
            <div className="header-return" onClick={() => checkCreate(false)}>
              <img
                src="/add-return-img.svg"
                alt="add-return-img"
                className="return-img"
              />

              <div className="return-text">Return</div>
            </div>

            <div className="header-done" onClick={handleSave}>
              <img
                src="/add-done-img.svg"
                alt="add-done-img"
                className="done-img"
              />

              <div className="done-text">Done</div>
            </div>
          </div>
        </div>

        <div className="create-body">
          <div className="create-info">
            <div className="name">
              <label htmlFor="name" className="info-label">
                Name book:
              </label>

              <input
                type="text"
                id="name"
                value={valueName}
                onChange={handleNameChange}
                className="info-input"
              />

              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="price">
              <label htmlFor="price" className="info-label">
                Price:
              </label>

              <input
                type="number"
                min="1000"
                step="100"
                value={valuePrice}
                onChange={handlePriceChange}
                id="price"
                className="info-input"
              />

              {errors.price && <div className="error">{errors.price}</div>}
            </div>

            <div className="category">
              <label htmlFor="category" className="info-label">
                Category:
              </label>

              <select
                id="category"
                name="category"
                className="category-select"
                value={valueCategory}
                onChange={(e) => setValueCategory(e.target.value)}
              >
                <option value="COMIC" className="category-opt">
                  Comic
                </option>

                <option value="MANGA" className="category-opt">
                  Manga
                </option>

                <option value="NOVEL" className="category-opt">
                  Novel
                </option>

                <option value="ROMANCE" className="category-opt">
                  Romance
                </option>

                <option value="NOTEBOOK" className="category-opt">
                  Notebook
                </option>
              </select>
            </div>

            <div className="quantity">
              <label htmlFor="quantity" className="info-label">
                Quantity:
              </label>

              <input
                type="number"
                min="1"
                id="quantity"
                value={valueQuantity}
                onChange={handleQuantityChange}
                className="info-input"
              />

              {errors.quantity && (
                <div className="error">{errors.quantity}</div>
              )}
            </div>

            <div className="desc">
              <label htmlFor="desc" className="info-label">
                Description:
              </label>

              <textarea
                type="text"
                id="desc"
                value={valueDescription}
                onChange={handleDescriptionChange}
                className="info-input"
              />

              {errors.description && (
                <div className="error">{errors.description}</div>
              )}
            </div>
          </div>

          <div className="create-picture">
            <div className="picture-title">Upload Image</div>

            <div className="picture-box">
              {/* first state: no img */}
              <div className="picture-add">
                <img
                  src="/picture-add-ico.svg"
                  alt="picture-add-ico"
                  className="picture-add-ico"
                />
              </div>

              {/* second state: have an img */}
              {/* <img
                src="/card-picture-img-default.svg"
                alt="picture-img"
                className="Picture-img"
              />

              <div className="picture-modify">
                <img
                  src="/picture-modify-ico.svg"
                  alt="picture-modify-ico"
                  className="picture-modify-ico"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBook;
