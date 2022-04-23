import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert,Linking } from "react-native";
import { db } from '../services/config';

const SendWord = (props) => {
  const [wordTranslation, setWordTranslation] = useState({
    portuguese: "",
    kikongo: "",
    kimbundo: ""
  })
  const [statusRequest, setStatusRequest] = useState({
    isSending: false,
    finishSuccess: false,
    finishWithError: false,
    message: ""
  })

  const dados = [
    { name: 'Abaixar', value: 'Tutula, Betama, Butala. ', kikongo: ' Kulula, Vetama, Betuka, Zembeka ' },
    { name: 'Abaixo', value: 'Boxi, Kuluiji, Koxi.; ', kikongo: ' Kuianda, Munxi, Vaianda, Kusolokelu.' },
    { name: 'Abalar', value: 'Katuka, Tingita, Xatuka.', kikongo: ' Nukuna, Titisa, Xina.' },
    { name: 'Abanar', value: 'Buka, Soka, Pepelela.', kikongo: ' Piata, Vemuna, Vuvila, Lema, Bubama.' },
    { name: 'Abandonar', value: 'Eha, Lémbua, Senga-Bangika.', kikongo: ' Veza, Lanvula, Xila, Tina.' },
    { name: 'Abandonado', value: 'Uahukunhi, Muri, Xiona', kikongo: ' Uaiambúlua, Uakulúa' },
    { name: 'Abarrotar', value: 'Izala, Izalesa, Toxala.', kikongo: ' Zala, Safula, Zalisa, Zadisa.' },
    { name: 'Abastecer', value: 'Ta Mbanzu, Sondama, Diteka', kikongo: ' Kudisansa, Bulumuna, Kudiambula.' },
    { name: 'Abater', value: 'Jiba, Batela, Bondela.', kikongo: ' Vonda, Buisa, Kulula.' },
    { name: 'Abatido', value: 'Labele, Uabehe.', kikongo: ' Mangunu, Atanda, Uanienga.' },
    { name: 'Abcesso', value: 'Kijimbu, Dimbu.', kikongo: ' E Taza, Lunetu, Evunbu. ' },
    { name: 'Abdicar', value: 'Katuka Kisoba, Lêmbua. ', kikongo: ' Kadila,Tumbúka, Kilémbua.' },
    { name: 'Abençoar', value: 'Zedíua, Bonza, Kondeka.', kikongo: ' Vuika, Tulula.' },
    { name: 'Abençoado', value: 'Uazediua, Uatôndua.', kikongo: ' Uasambúlua, Kiasambúlua.' },
    { name: 'Aberto', value: 'Iojukule, Uajikuka, Kiapengula', kikongo: ' Uajúka, Kiajikuka, Kievundu.' },
    { name: 'Abolir', value: 'Jima, Mana.', kikongo: ' Kunguna, Tadila, Katula.' },
    { name: 'Abominação', value: 'Kisalangu, Kisulukutu.', kikongo: ' Fu Kia Kula, Fu Kia Lundumuna.' },
    { name: 'Abominar', value: 'Kuma, Zemba.', kikongo: ' Núkua, Uumbika, Saula.' },
    { name: 'Abordar', value: 'Zama, Bíxila.', kikongo: ' Totana, Luakila, Kuaka, Iekama.' },
    { name: 'Aborrecer', value: 'Zemba, Ibila, Dibuíza.', kikongo: ' Núkua, Safuka, Zezela.' },
    { name: 'Aborto', value: 'Kiselu, Kuseluka, Kilute.', kikongo: ' Lubulu' },
    { name: 'Abraço', value: 'Ndandu, Kandandu.', kikongo: ' Mbimbakanu, Luananu, Lutotanu.' },
    { name: 'Abraçar', value: 'Bubala, Lubata, Dilekela.', kikongo: ' Bimbana, Bimba, Bimbakana.' },
    { name: 'Abrandar', value: 'Beleketa, Buíka, Jaja.', kikongo: ' Lembeka, Kulula, Zezesa.' },
    { name: 'Abrir', value: ' Jikula, Banúna, Papumana.', kikongo: ' Vembeka, Pakuna, Bundula.' },
    { name: 'Absolver', value: 'Loloka, Lolokela, Bulula.', kikongo: ' Lambula, Vezela, Vuaxila.' },
    { name: 'Absorver', value: 'Amua, Bonda, Fefenha.', kikongo: ' Vambuka, Iumisa, Lamisa, Minima.' },



    { name: 'Baço', value: 'Ndombe, Juenge.', kikongo: ' Vaxi, Bekele, Kiafuitu.' },
    { name: 'Bacorinho', value: 'Kangulu, Kamona. ', kikongo: ' Kaleitão, Kabaku.' },
    { name: 'Báculo', value: 'Kilunga, Dikóue. ', kikongo: ' Bungu, Nxi a koko.' },
    { name: 'Badalada', value: 'Ngunga.', kikongo: ' Kingunga.' },
    { name: 'Badalar', value: 'Xika, Ngongola. ', kikongo: '  Sika, Dodela, Zungana, Bolongonza.' },
    { name: 'Badaleiro', value: 'Musiki, Ndolo, Múkua-Dkanu. ', kikongo: ' Unxiki,Unxiki a Kingunga ' },
    { name: 'Badalo', value: 'Ndanji, kuxika Ngumga.', kikongo: ' Luiembelu, Lutoteku Lunukuinu.' },
    { name: 'Bafejar', value: 'Haha, Buseleia, Miona.', kikongo: ' Ximbisa, Vevumuka, Sadisa.' },
    { name: 'Bafio', value: 'Musuta, Fundungulu, Zimbadimuha. ', kikongo: ' Unfudangu.' },
    { name: 'Bafo', value: 'Muza, Muha, Muenhu. ', kikongo: ' Lutambuisu, Luximbisu.' },
    { name: 'Bagaço', value: 'Kafi, Ikami, Kikaxi. ', kikongo: ' Lubidiku,. ' },
    { name: 'Bagagem', value: 'Kikumba,imbamba,Ikuafa, Imbende. ', kikongo: ' Bima.  ' },
    { name: 'Baixo', value: 'Uabutu, Uahonga, Uangadiama. ', kikongo: ' Akuluka, Kuxira, Kiakete. ' },
    { name: 'Bajulador', value: 'Kimbundo:Sébue. ', kikongo: ' Unlenvudi, Unkembi. ' },
    { name: 'Bajular', value: 'Dimbambela, Bandamutu, Leba, Lesa. ', kikongo: ' Vinginina, Vuemukina, Vukumuina. ' },
    { name: 'Bala', value: 'Kabila, Solo. ', kikongo: ' Tuco, Ekela, Mpunza. ' },
    { name: 'Balança', value: 'Pesesu.  ', kikongo: ' Fuanisa, Pezu.  ' },
    { name: 'Balcão', value: 'Bálakelu, Vetekelu. ', kikongo: ' Báia.  ' },
    { name: 'Balde', value: 'Mbáliti, Kizenzu, Kazenzu, Kitabelu. ', kikongo: ' Zila, Dikinda, Sakuamuna.  ' },


    { name: 'Bandeira', value: 'Dibandela, Kipepumunu, Ndimbu ia fuka.', kikongo: ' Bandela, Ketembe, Luzailu.' },

    { name: 'Bandido', value: 'Kingulungumba, Kifumbe.', kikongo: 'Kimpumbulu, Kabuka, Mbandi.' },

    { name: 'Banco', value: 'Mbandu, Ngonge, Kitomba, Nzemba.', kikongo: 'E simu, Ndambu, Luxombolo, Nkoko, Mpeta.' },

    { name: 'Banana', value: 'Dihonjo, Dikonde, Kasoko.', kikongo: 'Tiba, Dikonde, Xiba, Lende, Nlemu a tía.' },

    { name: 'Barata', value: 'Dibalata, Lupeka, Lupenhe, Penha, Pese, Pelekese.', kikongo: 'Mpese, Luienu, Lututu.' },

    { name: 'Barba', value: 'Muezu, Kikamba.', kikongo: 'Bobo, Nzevu, Kisafa, Kienge.' },

    { name: 'Barato', value: 'Kiafika, Kialeluka, Utinga.', kikongo: 'Kiakeva, Anfiku, Nsendu, Ntalu ia kete, Kiantalu ia kukuka.' },

    { name: 'Baba', value: 'Nzebu, nzébue, Ifulu,Mate.', kikongo: 'Mete, Meta, Njembe, Luzembe, Nzembu, Fulu-fulu.' },

    { name: 'Babado', value: 'Kianzébue, Ió Uamububa mate mu dikanu.', kikongo: 'Kiatufina, Kiabolongo, Kiapuatama.' },

    { name: 'Bacia', value: 'Dilongo, Mbaxinha.', kikongo: 'Bola, Kuúua, Nsunga, E longa.' },

    { name: 'Bacio', value: 'Dilongo, Kibungo.', kikongo: 'Luenga Lua Subila Iovo lua nenena,Subila.' },

    { name: 'Bafo', value: 'Muza, Muha, Muenhu.', kikongo: 'Muela luvumu, Lutambuluísu, Luximbisu. ' },

    { name: 'Baixa', value: 'Honga, Mbuelu, Ndamba.', kikongo: 'Lukululuku, Nkoko, Lukevesu, Fulu kia kuluka.' },

    { name: 'Baixar', value: 'Betama, Kulumuisa, Tepula, Petama, Kuluka.', kikongo: 'Kulula, Fukama, Beluka, Vetama, Kundika, Veteka.' },

    { name: 'Barra', value: ' Kisasamba, Muxinda, Ditakunenu.', kikongo: 'Mbindi, Lukumbu, Nsuku, E senselu.' },

    { name: 'Barraca', value: 'Tundu,Dikumbi, E vundilu, Kisasamba, Tutulu.', kikongo: 'Balaka, Nzo a Nlele, E tamba, Saba, Kanzo ka mabáia, Lubolo,Kanzo ka vuvama.' },

    { name: 'Barrar', value: 'Beba, Bebeka.', kikongo: 'Beteka, Xuuluíla, Tapika, Lukakilu.' },

    { name: 'Barreira', value: 'Kipaka, Kibanga, Kibatu.', kikongo: 'Veúlu, Dungungu, E bongelu dia nteke.' },

    { name: 'Barriga', value: 'Divumu, Dimala, Rikebe.', kikongo: 'Vumu, LubuMbamu, Kebe, Luimitu.' },

    { name: 'Barriguda', value: 'Kirivumu, Divumu diedi ngaba-ngaba ni Kúdia, mala adikota.', kikongo: 'Kavumu, Vumu ia mpeuena, Uukuta, Luimitu.' },

    { name: 'Barrigudo', value: 'Múkua-divumu dionene, Mutu ni kidivumu, Mukua-dila dionene.', kikongo: 'Una ei vumu kia vimba, îtalala e vumu, Uakankuka e vumu.' },

    { name: 'Barulho', value: 'Nzanga, Jibúia, Ngololo, Nvunda, Nzangu, Muanji.', kikongo: 'Mazu, Ungolo, Ntantani, Luboko, Miangu, Luílu, Nvita, Luvovo, Lusoselu.' },

    { name: 'Base', value: 'Mbetekete, Kikota,Kikotongo, Nkulu, E bulu, Mbanjidilu, Ndanji.', kikongo: 'E sina, Luiekelu, Nkubílua, Lubuminu, Kiandekele.' },

    { name: 'Bastante', value: 'Kiavulu, Kinene, Kabasâ.', kikongo: 'Afuana, Kiauokela, Fuanu, Kiampuena, îngi, Kiabeta, Kialuta.' },

    { name: 'Bata', value: 'Lasá Kifutu, Kúdia, Kisakidilu.', kikongo: 'Lenga, Nvuatu, Nvuatu ua kula, Iunga, Kinkutu kiakula.' },

    { name: 'Batalha', value: 'Gela, Ita, Kulaka, Lunda, Kubentana, Kaúka, Kikaxi.', kikongo: 'Nvita, Nzingu, Lunuana,Luiembu.' },

    { name: 'Batalhar', value: 'Betana,Lúa, Bangagela.', kikongo: 'Nuana, Uandana, Nungajana e Nkomi.' },

    { name: 'Batata', value: 'Mbatata, Mbonzo, Karingu.', kikongo: 'Mbala, Lenge-lenge.' },

    { name: 'Bater', value: 'Popa, Pupa, Beta, Sula, Xina.', kikongo: 'Uanda, uândama, Koma, Ueta, Teva.' },

    { name: 'Bateria', value: 'Batadía', kikongo: 'Nvunda, Kibeta.' },

    { name: 'Batota', value: 'Panza, Mbonzo, Uadi.', kikongo: 'Luuílu luata, Luta lua Vonza.' },

    { name: 'Batotar', value: 'Ta Panza, Ta uadi.', kikongo: 'Ta e divuninu.' },

    { name: 'Batuque', value: 'Ngoma, Kindungu,Kukina, Lukinu, Kipuita.', kikongo: 'makinu, ludeku.' },

    { name: 'Bebê', value: 'Kamona, Mona a ndengue.', kikongo: 'Muana, Muana akete, Kindende.' },

    { name: 'Bebedeira', value: 'Uhólua,Lunkólua, Tumbendu, Kúnua.', kikongo: 'Lukólua, Tumbendu, Luzendengu.' },

    { name: 'Ensinar', value: 'Longa, sasa, Ndogixi, Dimina.', kikongo: 'Sansa, Lôngoka, Temunuisa, Jukula e lunji, Vangamesa.' },

    { name: 'Ensaiar', value: 'Dilonga,Vovolola, Longesa.', kikongo: 'Teza, Tezena, Vovolola, Longesa.' },

    { name: 'Ensaio', value: 'Kufikisa, Kuenga.', kikongo: 'Kufikisa, Ebalukisa, Mpovolola.' },

    { name: 'Ensinador', value: 'Ndongixi,Ubana Kuijia,Mésene.', kikongo: 'Nlongi, Nsanxi, Nlóngoki.' },

    { name: 'Ensino', value: 'Kulonga, Ulongelu.', kikongo: 'Lilongesu, Lucaisu.' },

    { name: 'Ensinamento', value: 'Kulonga, Ulongelu, Dilongelu, Mulongi, Kikombo.', kikongo: 'Lilongesu, Lucaisu, Fu kia Longela.' },

    { name: 'Enrolar', value: 'Vinda, Vindumuna, Buririka, Nhinga, Nhingika.', kikongo: 'Fitijoka, Losela, Bangumuna, Vindumuna.' },

    { name: 'Então', value: 'Anga, Anda, Inga, Abandá, Kaxi, Ze, Pe, Mbebu.', kikongo: 'Ibosi, Uáu, Unki, Dianu vo, Sumba.' },

    { name: 'Enterrar', value: 'Funda, Fundila, Vumbika, Lamba, Hinda.', kikongo: 'Jika, Zika, Lakila mu mavu, Vumba munxi a mavu.' },

    { name: 'Enterro', value: 'Kifundu, Tambi, Kufa, Kihindu, Kubaka.', kikongo: 'Luziku, LuvuMbiku, Ntambi.' },

    { name: 'Entrar', value: 'Bokola, Bokona, Bokueza, Bita.', kikongo: 'Kota, Kotela, Dimina.' },

    { name: 'Entidade', value: 'Mutu Umoxi, Umoxi, KUkala, Ene.', kikongo: 'Muntu umoxi eki kisongela lukalu lua kima, Lukadilu.' },

    { name: 'Entoar', value: 'Bana muimbu, mateka kuimba, Mateka muimbu.', kikongo: 'Vulumuna, Kusumuna, Sia e vunu.' },

    { name: 'Entornar', value: 'Xamuna, Xamuina, Muanga, Lundulula, Nûa luavulu.', kikongo: 'Muangana, Muanginika, Uixila, Itika, Vutukila, Tempula.' },

    { name: 'Entre', value: 'Buaxaxi, Buaxaxi ka, Bu kaxi.', kikongo: 'Vakaxi, Munxi, Vaxinu.' },

    { name: 'Entretanto', value: 'Akiki, Anga, Mbambe, Hinu, Ki, Kioso.', kikongo: 'Mukaxi Kakiókio, Muna kolo kiókio, Kiatuminu, Kiantángua.' },

    { name: 'Entrevista', value: 'Kundu, Kudisanga kua Umesene, Kutakana bu muadiambela.', kikongo: 'Lutangelu, Lutangumunu, Lusamuínu, Luxikidisu.' },

    { name: 'Entrever', value: 'Mona bila, Mona lusolo, Muena.', kikongo: 'Xisa e disu, Longoluensa, Fufitila, Kudiuúia.' },

    { name: 'Entregar', value: 'Telekala, Ba, Bana, Tambeka, Tambuisa, Xila.', kikongo: 'Ueta tambika, Véua, Vânika, Vutula, Iekula.' },

    { name: 'Esbanjar', value: 'Zanga, Ngastala, Sana jimbote, Nhona, Besela.', kikongo: 'Uola, Sana, Fuisa, Nunka, Muangisa.' },

    { name: 'Esbarrar', value: 'Balakanha, Ditexi, Jimbila Njila.', kikongo: 'Uanana, Totana, Fionka.' },

    { name: 'Esboçar', value: 'Handeka, Xinda mu anda kubitila kikalakalu.', kikongo: 'Uaxika, Zaisa, Muenesa, Fikisa, Katula eteke.' },

    { name: 'Esboço', value: 'Kubandeka, Kibangu kia muxinji, Kuta mitutu, Kitetu kia mumba.', kikongo: 'Fikula iabandúlua mu lapi, Lutapi, Ndimbu, Lukasu, Uteke kia lanvikua.' },

    { name: 'Escada', value: 'Xikata, Dilondelu, Kibandelu.', kikongo: 'Kima kia bandila, Emantinu, Luzanjilu, Kikada.' },

    { name: 'Escalamento', value: 'Kukala.', kikongo: 'Fu kia zanzamena, Luzanzamu.' },

    { name: 'Escalar', value: 'Zúa, Banda, Kala.', kikongo: 'Sunda, Dumuisa, Zanzama, Puakesa, Ianga.' },

    { name: 'Escamar', value: 'Kulula, Tetula.', kikongo: 'Vala, Kuana, Laleka.' },

    { name: 'Escamas', value: 'Ibalabala.', kikongo: 'Mavaku,Vesu, Matesa, Makuana.' },

    { name: 'Escapar', value: 'Bulaka, Buluka, Láia, Lueza, Xongomoka, Vuluka, Bita, Lenga.', kikongo: 'Vuluza, Tinisa, Xinisa, Taiisa, Kutisua.' },

    { name: 'Escapatório', value: 'Kikisoko, Ki-tutena, Kuxikana, Kitena Kubuluka, Sembele.', kikongo: 'Unvuluki, Kiabuisa, Kilenda ovuluka, Kiasafuka, Kiaxitila.' },

    { name: 'Escape', value: 'Ditundilu, Ubuluilu, Ulengelu.', kikongo: 'Evaikilu, Etundilu, Lukionu, Fu kia kutumukina.' },

    { name: 'Escandâlo', value: 'Kubana milongi iaíba kua mukuetu, Kubukanesa.', kikongo: 'Ebumbu, Tesa, Sngo e fu iambi.' },

    { name: 'Escandaloso', value: 'Kitondalesa, Kibeka mu njila iaíba, Múkua-kufudisa.', kikongo: 'Umbenvuni, Unvukumuni.' },

    { name: 'Escarrar', value: 'Kalala, Kalumuna, Tu-bula bu kanu mba bu xingu.', kikongo: 'Kualumuna, Iaula, Tauluila, Kuana, Vuxila, Kofona.' },

    { name: 'Escarro', value: 'Kixinda, Dikeku, Kalumunu.', kikongo: 'Luakuamu, Lukalumunu, Lukofono.' },

    { name: 'Escassez', value: 'Kukamba, Kukambela, Kikala, Ukambu, Kupopama.', kikongo: 'Kima kiakete, Kuabuila, Muimi, Kándua, Suisa.' },

    { name: 'Escasso', value: 'Kiapéngula, Kiofele, Kiala ofele, Kiakamba, Kikivudila, Kinjenje.', kikongo: 'Kiabamina, Amuini, Kiakeye, Kiakámbua.' },

    { name: 'Escavação', value: 'Kipaka, Kifukinu.', kikongo: 'Fu kia budila iovo kia kavila, Lukatulu lua mavu, Luvumbulu.' },

    { name: 'Escavar', value: 'Fukina, Fukuna, Dimina, Kanda.', kikongo: 'Fula, Tuila, Vasuna, Katula o mavu.' },

    { name: 'Escoamento', value: 'Kuboloka, Kujikinina, Kukouala, Kuehesa kubita bofele-bofele.', kikongo: 'Fu kia sengela, Nkulumuna.' },

    { name: 'Escoar', value: 'Kenxa, Uáia, Zúua.', kikongo: 'Sosesa, Lutuila, Sonsena, Senga.' },

    { name: 'Escola', value: 'Xikola, Inzo ia longela.', kikongo: 'Sikola, Nzo ia longéla, Nzo ia nzaila.' },

    { name: 'Escolha', value: 'Kusola, Usolelu, Kunona.', kikongo: 'Lusolu, Lunonu, Luungilu, Luvambulu.' },

    { name: 'Escolher', value: 'Sola Nona, Ximbula, Banda, Bungula.', kikongo: 'Tumba, Vambula, Vévua.' },

    { name: 'Escolhido', value: 'A-mu-solo, Kisole, A-mu-sondolola mu kilunga kia akuá, Kabenda.', kikongo: 'Kiasólua, Kianónua, Kiavévua.' },

    { name: 'Esconder', value: 'Sueka, Suekela, Lengesa, Batama.', kikongo: 'Fuka, Fukidila.' },

    { name: 'Escorregar', value: 'Xangumoka, Huluka, Zuluka, Selumuka, Xelumuka, Sunuka, Kualumuka.', kikongo: 'Sielumuka, Sumuka, Kualumuka, Kunhumuka, Xendeuka, Piatisa.' },

    { name: 'Escorrer', value: 'Buba, Bubisa, Zunza, Zúua, Dizuuila, Ndonda.', kikongo: 'Kienza, Kama, Vuisa, Naxisa, Uixila, Sonsela.' },

    { name: 'Escova', value: 'Xikova, Muindu, Kikuvalu.', kikongo: 'Jikova, Sanu kiampuena, Lusekelu.' },

    { name: 'Escovar', value: 'Kuvala, Kondona, Kukumuns, Kubula.', kikongo: 'Kúnguna e lékua iovo o nvuatu, kubula, Seka, Tukuta.' },

    { name: 'Escravatura', value: 'Kiiamba, Ubika, Ukuikilu.', kikongo: 'Ubiki, Ubundu, Uuáii.' },

    { name: 'Escravidão', value: 'Kibka, Ubika, Ukuikilu.', kikongo: 'Ebolo, Mpila ia dibolo, Mpila ia pelezu.' },

    { name: 'Escravizar', value: 'Bengesa, Mubika, Bika, Bikisa, Banga ubika.', kikongo: 'Vanga umbundu, Bubisa, Zanguisa, Kuvisa.' },

    { name: 'Escravo', value: 'Mubika, Ubika, Mupika, Musumbe, Nekulu.', kikongo: 'Mbika, Mika, Nsumbi, Mbuindu.' },

    { name: 'Escritório', value: 'Inzo ia mikanda, Onzo io kusonena.', kikongo: 'Disonemu, Nzo ia sonena.' },

    { name: 'Escritura', value: 'Kisoneku, Ndukumendu.', kikongo: 'Nkanda ua nfunu, Sono.' },

    { name: 'Escudo', value: 'Málaka, Ngubu.', kikongo: 'Vanza, Utona.' },

    { name: 'Ferida', value: 'Fidila, Dibude, Falanji, Kilonda.', kikongo: 'Vuma, Mpuma, Mukela, Kitalakamba.' },

    { name: 'Ferido', value: 'Kiahuhi, Kikuame.', kikongo: 'Nduadi, Unluadi, Mbevu, Unkualumuka.' },

    { name: 'Ferimento', value: 'Kilonda, Kibetu, Mbole.', kikongo: 'Olueka, Lulueku, Lubavu.' },

    { name: 'Ferir', value: 'Ta fidika, Kuama, Xangumuna, Luualela.', kikongo: 'Lueka, Muluekele, Luana, Telesa.' },

    { name: 'Féria', value: 'Kizúa kia sumanu, Nganhu.', kikongo: 'Lumbu kia semana, Luvundu, Nfutu ia minsadi.' },

    { name: 'Feriado', value: 'Kizúa kia nhoka, Kizúa kia fesa', kikongo: 'Luvundu, Lunangu.' },

    { name: 'Feio', value: 'Kiaíba, Uaíba, Muíbi.', kikongo: 'Uambi, Uambi-uambi, ambi, Alulu.' },

    { name: 'Feira', value: 'Kitanda, Kinanga, Mutanda.', kikongo: 'Mutamba, Ezandu, Fulu kia tekela.' },

    { name: 'Feitiçaria', value: 'Kipeteka, Umbanda.', kikongo: '' },

    { name: 'Feiticeiro', value: 'Muloji, Nganga, Kihuende.', kikongo: 'Kimbanda, Ndoki, Mbiki, Untantu, Nloji.' },

    { name: 'Feitiço', value: 'Kiteke, Kizangu, Uanga, Mukixi.', kikongo: 'Nkisi, Mpandu, Manga, Ndoki.' },

    { name: 'Feitio', value: 'Kifua, Ubangelu.', kikongo: 'Mpila, Lukeketu, Lutomesu.' },

    { name: 'Feito', value: 'Ubange, Kiabangíua, Kalakale, Kikalakari.', kikongo: 'Kivangilu, Kiavángua, Kiavangíua, Kiasadíua.' },

    { name: 'Feliz', value: 'Uatana.', kikongo: 'Kiakuluka, Elau.' },

    { name: 'Fezes', value: 'Matuji, Maxanda, Ivunzu, Ixix, Isenga.', kikongo: 'Makafi, Vindu, Lumaninu.' },

    { name: 'Fevereiro', value: 'Dijina dia mbeji, Mbeji ia muanha.', kikongo: 'Ngonde ia muíni.' },

    { name: 'Ficar', value: 'Xala, Fama, Suva.', kikongo: 'Kala, Manga, Nangina, Vuanda.' },

    { name: 'Fiança', value: 'Kífua kia kubota, Kisungi.', kikongo: 'Fu kia devesa, Devesu, Ludisu.' },

    { name: 'Ferramenta', value: 'Falamenda, Ikuata, Itele, Kikete, Ima ia kutalaváia.', kikongo: 'Imbamba, Esadilu.' },

    { name: 'Ferrar', value: 'Lumata, Numata, Nganga, Suma, Baka.', kikongo: 'Fiobesa io manga.' },

    { name: 'Festa', value: 'Kizomba, Fesa, Kusamba.', kikongo: 'Nkinzi, Nkembu, Lukembu.' },

    { name: 'Fervura', value: 'Kutema.', kikongo: 'Luidinu.' },

    { name: 'Gratidão', value: 'Kisakidilu, Kitonda, Kiximanu.', kikongo: 'Tombelo, Etondo, Lusakidilu.' },

    { name: 'Gratificar', value: 'Senda, Sakidila, Bana, Kitadi mba matabisu.', kikongo: 'Vana e nfuru, Tonda e mbote, Iambuila.' },

    { name: 'Gratificação', value: 'Diláu, Kisakidilu, Kifutu.', kikongo: 'Tadi, Nfutu, Matabisu.' },

    { name: 'Grátis', value: 'Kiobange anga kiobane ngó, Kinama, Kia henda.', kikongo: 'Angovo, Kienana, Kiankutu, Kia nkenda.' },

    { name: 'Grato', value: 'Uasakidila, Mutdonde, Kiahatu.', kikongo: 'Kiasakidila, Kiatondela, Antondi.' },

    { name: 'Gratruitamente', value: 'Ngó, Ngoho, Kingó.', kikongo: 'Kiamuende, Malopa, Kiankailua.' },

    { name: 'Gratuito', value: 'Ngó,Ngoho, Ngókio.', kikongo: 'Kia nkatu, Angovo.' },

    { name: 'Grávida', value: 'Uatámbula o mona.', kikongo: 'Nkentu uabubalala evumu.' },

    { name: 'Grave', value: 'Téia-téia.', kikongo: 'Kiampuena-Mpuena.' },

    { name: 'Gravar', value: 'Tala, Seta.', kikongo: 'Muesa o makaxi.' },

    { name: 'Gravidade', value: 'Kijingu.', kikongo: 'Lunetu, Ujitu.' },

    { name: 'Gravata', value: 'Kibetu kia xinga.', kikongo: 'Tembe kia laka.' },

    { name: 'Gravidez', value: 'Kimitu, Támbula mona mu divumu.', kikongo: 'Iámubla muana vua divumu. ' },

    { name: 'Greve', value: 'Kipapa, Ndumba iákua-kukalakala adituna kubanga silivisu se miadi iá kabangele kiandulu kiá, kipalalesu, Kia kikalakula.', kikongo: 'Kuxinda, Njingu mia vova, Ntikumuka asunga kia nsadi, Kemesa buka kia antu kiadikuuanana ualesa e salu.' },

    { name: 'Grossaria', value: 'Kikuba, Makuba, Makoza.', kikongo: 'Vonga, Nneta, Mambu makámbua o lujitu.' },

    { name: 'Grosseirão', value: 'Mbalu, mutu sê kilunji nê ulongelu, Múkua-muxitu.', kikongo: 'Uavonga Kuingi, únkuanfinda, Kipombo.' },

    { name: 'Grosseiro', value: 'Mbuanza, Kimbumbulukutu.', kikongo: 'Nvuanvuala, Zengi.' },

    { name: 'Gritar', value: 'Dila, Kola, Kolela, Boka.', kikongo: 'Dila kuingi, Kololoka, Kaza, Tala.' },

    { name: 'Gritaria', value: 'Ngololo, Kingololo.', kikongo: 'Lubokelu, Kololoka, Lunanamu.' },

    { name: 'Grito', value: 'Mbimbinu, Mutendu, Nzonza.', kikongo: 'Boko, Kazu, Tatu, Lutelu.' },

    { name: 'Gripe', value: 'Mbambi, Kixinda.', kikongo: 'Févele, Iela, Mpaxi.' },

    { name: 'Grilo', value: 'Nzenze,Kimzeze.', kikongo: 'Ezenze, Luxololo.' },

    { name: 'Grupo', value: 'Mundu ua îma, Dianda, Kipupa.', kikongo: 'Ndonga, Ekutu, Ebundu, Buka.' },

    { name: 'Guarda', value: 'Baka, Langa, Lundila, Lunda.', kikongo: 'Langidila, Kubika, Vanga.' },

    { name: 'Guardanapo', value: 'Mukombi.', kikongo: 'Nlele uakungununa ónua.' },

    { name: 'Guia', value: 'Kituamenu, Kituamenenu.', kikongo: 'Tuamina, e njila.' },

    { name: 'Guiador', value: 'Muendexi, Kapita.', kikongo: 'Nkuendesi, Mbindikilu.' },

    { name: 'Guerreiro', value: 'Múkua-ita, Múkua-kúlua.', kikongo: 'Mbalakami, Kingumba.' },

    { name: 'Guloso', value: 'Múkua-luimbi mu kúdia, Múkua-jihanji.', kikongo: 'Ambiki, Okavila, Nsuangadi, Untafuni.' },

    { name: 'Guita', value: 'Ngoji, Soma, Kamukolo.', kikongo: 'Ngonji, Ximba, Nxinga.' },

    { name: 'Guitarra', value: 'Mbanza, Kambanza.', kikongo: 'Luvuitu, Kitanda, Ngoma ia xikila ie nlembu.' },

    { name: 'Guiar', value: 'Kuendesa, Bita.', kikongo: 'Xindika, Diatisa.' },

    { name: 'Habilitar', value: 'Ta iambu, Kalanga, Longa.', kikongo: 'Zaísa, Longesa.' },

    { name: 'Habilitação', value: 'Ndunge, Uhete.', kikongo: 'Ngangu, Lufuanu.' },

    { name: 'Habitação', value: 'Inzu, Dibata, Kitungu.', kikongo: 'Nzo, Evata, Kala.' },

    { name: 'Habitante', value: 'Múkua-ixi, Mukuanzo.', kikongo: 'Nkuanzo, Unkadi.' },

    { name: 'Habitar', value: 'Kala, Nanga, Zelela.', kikongo: 'Kala ie Nzo.' },

    { name: 'Hábito', value: 'Kifa, Kifana.', kikongo: 'Nvuatu, Kizuatu.' },

    { name: 'Habituado', value: 'Uejidila.', kikongo: 'Nkutukidi.' },

    { name: 'Harmonizar', value: 'Fama, Jiulula.', kikongo: 'Vuvisa, Lembuluísa.' },

    { name: 'Harpa', value: 'Álapa, Mbanza.', kikongo: 'Kokolo.' },

    { name: 'Hasta', value: 'Dionga, Musongo.', kikongo: 'Mbanvilu, Nteka a kinzáu.' },

    { name: 'Haste', value: 'Ngunhu, Mbinga, Tangu.', kikongo: 'Unxi ua vundula, Lumbindikilu.' },

    { name: 'Haver', value: 'Sai, Kala, Mona.', kikongo: 'Tala, Kaxidi, Auana.' },

    { name: 'Heim?', value: 'Kuambe?, Kuxi?.', kikongo: 'Uaué!, Unki?.' },

    { name: 'Hemisférico', value: 'Dibumbu dia kaxaxi, Mbandu.', kikongo: 'A nza, Ndambu a nzi.' },

    { name: 'Hemorragia', value: 'Ditundilu dia manhinga.', kikongo: 'Lukatuka lua menga.' },

    { name: 'Herança', value: 'Undundu, Kandámbia.', kikongo: 'Ima ia vumbi, Éfua.' },

    { name: 'Herbívoro', value: 'Údia iangu mba inima.', kikongo: 'Bulukidiango xixi ie bundu, vuka kidianga e xi.' },

    { name: 'Hérnia', value: 'Kimbuila.', kikongo: 'Únkua-nlola.' },

    { name: 'Herói', value: 'Ngunza.', kikongo: 'Nkabi, Ekesa, Kimbangala.' },

    { name: 'Herdeiro', value: 'Mulundudi, Ndundu, Hunde.', kikongo: 'Unvinganu, Mumpingila éfua iovo ima ia vumbi. Unsadilu.' },

    { name: 'Herdar', value: 'Lundúla, Bingana.', kikongo: 'Lumbula, Vuila, Vingila' },

    { name: 'Higiene', value: 'Umbote, Kuzela, Kikalakalu, Kiauaba pala kukala ni muenhu uambote.', kikongo: 'Mambu ma vimpi luvelelesu, nvelela, lusemu.' },

    { name: 'Hilariante', value: 'Kituala kisangalasa, Kiavuvika, Kiavuvika.', kikongo: 'Kiese, Iangala, Luiangalalu, Lusevelu.' },

    { name: 'Himen', value: 'Kabasu, Kiba kiofele kijika kivaji kia muhatu, Tendu.', kikongo: 'Ubaku, Lûtukila, Lupapilu, Lusompunu.' },

    { name: 'Hino', value: 'Muimbu, Mukumbi, Kisungu.', kikongo: 'Nkunga, Tola, Lutolu.' },

    { name: 'Hipócrita', value: 'MÚkua-kária, Kingandu, Uala ni Kádia o mangonha.', kikongo: 'Nkâ-kuvunina, Umpuki.' },

    { name: 'Hiena', value: 'Kimalanga, Limbungu, Kimbúngua.', kikongo: 'Kimpalangu, Kinguanji.' },

    { name: 'Hipopótamo', value: 'Dikebe.', kikongo: 'Lubutamu, Kiabutama.' },

    { name: 'História', value: 'Malunga, Musoso.', kikongo: 'Lusansu, Obukiditu, Moko ia nkulu kintindi.' },

    { name: 'Historiador', value: 'Uta misoso, Musaoneki.', kikongo: 'Unsoneki a mambu ma nza, Untangi a mambu mabela.' },

    { name: 'Hoje', value: 'Lelu, Mu kizúa kia lelu, Mu kizúa ino, Lumbu kaki.', kikongo: 'Ouáu, O unu, Diedimu, Unu diadi, Lumbu, Kaki, Kialumbu, Ekiaki, Mu Ntangua eái.' },

    { name: 'Homem', value: 'Diala, Mutata, Mutu.', kikongo: 'Eiakala, Ebalu, Nkuluntu.' },

    { name: 'Homenagem', value: 'Kiximanu, Kifumanu, Kisakidilu.', kikongo: 'Nkembu, Kunda, Tutondelu.' },

    { name: 'Pessoas', value: 'Atu, Mundu ua atu, Mala, Afi.', kikongo: 'Antu, Bantu, Ndonga ia antu, Iakala.' },

    { name: 'Homicida', value: 'Kijiba, Mujibe a akuetu.', kikongo: 'Kivonda o muntu, Kimpumbulu.' },

    { name: 'Homicídio', value: 'Kujiba, Kijiba, Ujibanganga.', kikongo: 'Vonda o muntu, Luvondo lua muntu.' },

    { name: 'Honestidade', value: 'Kizelu, Uzedi, Nganda.', kikongo: 'Zitu, Lujitisu, Kangalo ambote, Ludi, Kieleka.' },

    { name: 'Honesto', value: 'Mujitu, Mumbundu, Uakidim Uatetuluka.', kikongo: 'Unvumini, Kiavunina, Kialombélua.' },

    { name: 'Imaginação', value: 'Kubanza, Kixinganeku, Ditala.', kikongo: 'Banzu-banzu, Mbadika, Luvunxilu.' },

    { name: 'Imaginar', value: 'Ila, Banza, Fika, Kalikulala.', kikongo: 'Kevesa, Levesa, Badika, Iindula.' },

    { name: 'Imaginável', value: 'Kixingeneku, Kubanza.', kikongo: 'Kiambisu, Ke kia luaka mu ntángua iávia-ko.' },

    { name: 'Imbecil', value: 'Kiximba, Kituji, Mbulutu.', kikongo: 'Molo, Kióua, Matutu, Kimbumbulukutu.' },

    { name: 'Imaturo', value: 'Kiauisu, Kaxibile.', kikongo: 'Kiambisu, Alembi kola iovo buaka.' },

    { name: 'Imediatamente', value: 'Kitangana kienieki.', kikongo: 'Vana, Zaki.' },

    { name: 'Imediato', value: 'Kabanda, Mutumini.', kikongo: 'Kiafilama.' },


    { name: 'Amor', value: 'kizola, Henda, Kinhami, Ukamba, Kiari.', kikongo: 'Nkenda, Nzola, Luzolu, Lutondu, Lutondelu, E kanga.' },

    { name: 'Amor ao próximo', value: 'Upange, Henda ia mukenu.', kikongo: 'Kiese kua nnkundi, Luzolu lua nkuetu.' },

    { name: 'Amor Fraterno', value: 'Kudizola ni akuentu, Kudituma ni jipange, Kunhupuka.', kikongo: 'Kudizola kiambote, Kudituma kiampuena, Luzolu lua mbunji.' },

    { name: 'Coração', value: 'Muxima, Muenhu, Pupa.', kikongo: 'Ntima, Nxima, Kimuanda, Móio, Monho, Mbundu.' },

    { name: 'Bom-dia', value: 'Uazeká, uazekele kié, Sá ngana, kimeniókio ngana.', kikongo: 'Lele, Oxikamene?, Okolele?, Una kiamboté.' },

    { name: 'Boa-noite', value: 'Usuk ó, Usuku uambote, Kusanguluka.', kikongo: 'Fuku umbote, Nuna kiamboté, Kembaji.' },

    { name: 'Boa-tarde', value: 'Uanange kiebi.', kikongo: 'Onángini, Ototele.' },

    { name: 'Boas-festas', value: 'Jifesta jiambote.', kikongo: 'Bofika, Lukaílu lua nvu ampa.' },

    { name: 'Boa-viagem', value: 'Bixila,Ndaiê!.', kikongo: 'Uenda Kiambote, Uenda Kiabiza.' },

    { name: 'Boa', value: 'Uaujitsu', kikongo: 'Kiambote, Kiatoma, Kiaxingama.' },

    { name: 'Sangue', value: 'Mahinga, Kinhinga.', kikongo: 'Menga, Vendu.' },

    { name: 'A desoras', value: 'Masungilu,uajimbrili,muasukama.', kikongo: 'Nanga,kiese,luaka maxika,londula.' },
    { name: 'A noite', value: 'Mu usuku.', kikongo: 'mu axika,e ntánga maxika..' },
    { name: 'Abafar', value: '-Fulumika,-kondeka.', kikongo: 'kuluka e ngolo,kaka,vuvumuka,puaxika.' },
    { name: 'Abafador', value: 'Mufuti,muvunge.', kikongo: 'Unkaki,unfukumuki.' },
    { name: 'A toa', value: 'kua ngó.', kikongo: 'kiapatiku,kiakuenda e nkatu.' },
    { name: 'Abanar', value: '-Buka,-bukirila,-soka,-pepelela,lokosa.', kikongo: 'Piata,vemuma,vuvila,lema,vuxila,bubama.' },
    { name: 'Abastecer', value: '-T mbanzu,-bindumukina.', kikongo: 'Kudisansa,bulumuna,kudiambula.' },
    { name: 'Abater', value: '-jiba,-batela,-betama.', kikongo: 'Vonda,buisa,kulula,kekumuna.' },
    { name: 'Abandono', value: 'kubangila,saxisa.', kikongo: 'Fu kia vezela,luvezu.' },
    { name: 'Aberto', value: 'lojukule,uajikuka,kianduka,kiapengula.', kikongo: 'Uajûka,kiajikuka,kiatumbuka.' },
    { name: 'Abertura', value: 'Ditubu,dibokuelu,muelu.', kikongo: 'Njila,lutobolo,lujuulu,nsanzu.' },
    { name: 'Abismo', value: 'Mukiukuluku,ngenda,kalunga,kirikungu.', kikongo: 'lukuzu,tombe,lubuitu,mbilu.' },
    { name: 'Abolir', value: '-jima,-mana.', kikongo: 'Kunguna,tumbula,tadila,katula.' },
    { name: 'Abominação', value: 'Kisalangu,kisulukutu.', kikongo: 'Fu kia kula, fu kia lundumuna.' },
    { name: 'Abobora', value: 'Dinhângua,ditanga,kasolo.', kikongo: 'E lenge,dilenge,pingingi,ntove.' },
    { name: 'Aborto', value: 'kilute.', kikongo: 'lubulu,lualamako.' },
    { name: 'Abordar', value: '-Zama,-bixila,kuiza.', kikongo: 'Totana,kuankalakana,luakila,filma,kuaka.' },
    { name: 'Aborrecer', value: '-Zemba,-ibila.', kikongo: 'sula,savula,safuka,zeza.' },
    { name: 'Abrandar', value: '-Beleketa,-sosoloka,-Zokela.', kikongo: 'lembeka,kevesa,kulula o kuenda mulemba,kevesa.' },
    { name: 'Abranger', value: '-Leka,-dikondeka,-kuata.', kikongo: 'Baka,Ximba,tala vana.' },
    { name: 'Abreviação', value: 'kusakalala,kibitisu.', kikongo: 'Fu kia komena,luzengu lu diambu.' },
    { name: 'Abreviatura', value: 'kuteta ndimbu,kuzuála.', kikongo: 'Zaúla,sonoe dimbu,soneka o mumbu.' },
    { name: 'Abraçar', value: '-Bubala,-bana kandandu.', kikongo: 'Bimba,sambikina,sambidila.' },
    { name: 'Abraço', value: 'Ndandu.', kikongo: 'Mbimbakanu,lumbimbanu.' },
    { name: 'Abrigar', value: '-Kondamesu,-dikonda.', kikongo: 'Suama,vuvama xina e nvula,sueka.' },
    { name: 'Abrir a cada passo', value: '-jikujula.', kikongo: 'jula-jula.' },
    { name: 'Abrir brecha', value: '-Bumuma,-pama.', kikongo: 'Tenda e mbânvua.' },
    { name: 'Abrir buraco', value: '-fufkuna,-fukula.', kikongo: 'Xima,xima e dibula, kava.' },
    { name: 'Abrir fossos', value: 'Fukina, -jiku-la-jinjila.', kikongo: 'Fula,xima.' },
    { name: 'Abrir passagem', value: '-Tembalala.', kikongo: 'Budila,jula e njila.' },
    { name: 'Absorvente', value: 'Kixibe,múnue,muxibe.', kikongo: 'Nfibi,unfieti,unui.' },
    { name: 'Absorver', value: 'Amua,-bonda,-xipa,-suba.', kikongo: 'Vambuka,uumina,iumisa,minima,minha,fibo,vola.' },
    { name: 'Abundância', value: 'Dibutu,kibube,kivula.', kikongo: 'luuokela,luidiku,uuokela,uingi,ololo.' },
    { name: 'Abundante', value: 'kiabototó,kinenenene.', kikongo: 'lingi,iaokele.' },
    { name: 'Abusar', value: '-Buzala,-vuuama,-sakanesa,-iongola.', kikongo: 'Tobesa,fuasa,levula,veza,uaxikila,tuka,kumika.' },
    { name: 'Abusivo', value: 'Kavuvu.', kikongo: 'ie nvuanza.' },
    { name: 'Abuso', value: 'Nkabu,mbuanza.', kikongo: 'Nvuanza,luaxiku,nfuasu.' },
    { name: 'Acabar', value: '-Zuba,-Buisa,-buika.', kikongo: 'fokolo,vuá,mana,vuisá.' },
    { name: 'Academia', value: 'Kilunga Kía jingijiue,sikola,inene.', kikongo: 'Nzo iampuena,ialongela.' },
    {
      name: 'Académico', value: 'Moa xikola, kíatoka mu kilunga kia.', kikongo: 'Unlongoki.'
    },
    { name: 'Aceder', value: '-Xikana,-Tonda.', kikongo: 'Lambula,Tambujila.' },
    { name: 'Aceitar', value: 'Táua,-Xikana,-xikina.', kikongo: 'Baka,tambujila,kumbuiluila.' },
    { name: 'Aceitável', value: 'Kixikane,kiakubanduluka.', kikongo: 'ktondélua,kiatambuluilua.' },
    { name: 'Aceleração', value: 'Kuxakumba,kusangama.', kikongo: 'Funkia tensukila,luxietu.' },
    { name: 'Acerlerado', value: 'kasokelela,kiasangama.', kikongo: 'kiatensuka,kiavoloka.' },
    { name: 'Acelerar', value: '-Xinjika,-Lenguluka.', kikongo: 'voloka,kolesa,xiamakana.' },
    { name: 'Acenar', value: 'Balula,-leka.', kikongo: 'Zunga,zungisa,vanga lusonalu.' },
    { name: 'Acender', value: '-Sendela,-uika,-Lema,-Kuama.', kikongo: 'Kuika,kuxika o tia, ioka, tatika.' },
    { name: 'Acento', value: 'Kukolesa.', kikongo: 'kunda,luvuanda.' },
    { name: 'Acentuar', value: 'Sa kidimbu,.', kikongo: 'vova kiambote.' },
    { name: 'Acertar', value: '-Lungama,-iukisa.', kikongo: 'lungisa,vatiana,xingika,tondola.' },
    { name: 'Acesso', value: 'Muelu,lubixilu.', kikongo: 'luakila,nduka,lufilamu,nfinama.' },
    { name: 'Acessório', value: 'kiasukuku,nsuka.', kikongo: 'kinvingani,kékia xilua-ko,kékiavia-ko.' },
    { name: 'Acidente', value: 'Uíma,kifua,kimonuku,usauka.', kikongo: 'Uvonza,suxi,tuntu,kubu,lusobo lua nxi.' },
    { name: 'Acidez', value: 'Urlegenge,karima.', kikongo: 'Lusasu,kajaja,lubetu,luboto,lungangamu.' },
    { name: 'Achar', value: '-Sanga,-Sangela,-Bonga,-alula,-nona.', kikongo: 'Tungulula,-mona,bono,gelela.' },
    { name: 'Aclamar', value: '-sanguluka,-Tondela,-Samba.', kikongo: 'Vozesa,Vuvika,Vumbula.' },
    { name: 'Doença', value: 'Uhaxi,kukuta,kubunji.', kikongo: 'kimbevu,iemevu,iela,giela.' },
    { name: 'Doente', value: 'Haxi,uakat,múkua-kukata.', kikongo: 'Ntoto,iela.' },
    { name: 'Doer', value: '-kata,-tuza,-benha.', kikongo: 'iama,vuvila,umoni a mapaxi.' },
    { name: 'Dominar', value: '-Tuma,-tumina,-bikisa.', kikongo: 'lâla,kulula,fuxila,baxila.' },
    { name: 'Domingo', value: 'Lumingu,Kizúa kiakunhoha.', kikongo: 'Lumbu kia Nzambi, Lumbu kia nfumu,Lumbu kia vunda.' },
    { name: 'Domínio', value: 'Ungana,Undembu.', kikongo: 'Lutum,uisa,uene.' },
    { name: 'Dona', value: 'Nda,ngana,muenea nzo.', kikongo: 'Nengua,mukuanzo,lufuasu lua vumisa.' },
    { name: 'Donativo', value: 'Henda,Simola,kitadi.', kikongo: 'Lukau,Nkenda,Nxatula.' },
    { name: 'Dono', value: 'Muene,ngana.', kikongo: 'Nfumu,unvuidi.' },
    { name: 'Elogio', value: 'Diximanu,kiximanu.', kikongo: 'nkembu,lukembesu,lusanisu.' },
    { name: 'Elucidar', value: '-Longa,-longolola,-lomboloka.', kikongo: 'Tendula,samununa,sasa,kiesela.' },
    { name: 'Em', value: 'Mu,mua,bu,ku.', kikongo: 'Mo,muna,ku,kuna va,vana.' },
    { name: ' Expressão', value: 'Kitangulu,uambelu.', kikongo: 'Fubkia kamina,nkumika a nvovo,mambo mavovela io kuluka.' },
    { name: 'Exposto', value: 'Xona,kiala ku mesu.', kikongo: 'Unvungani,muana auvézua,kiavézua,kiavengama.' },
    { name: 'Exclamar', value: '-Zuela,-Dikola,-Ditenda.', kikongo: 'Bokela,vov,kazu.' },
    { name: 'Excitar', value: '-Kitukisa,-salamuna,-sukisa.', kikongo: 'Muanga-lakesa,kolesa,songa.' },
    { name: 'Excesso', value: 'Humgulule,kiteseku,kisube.', kikongo: 'nsuva,lusuva,nsuvidi.' },
    { name: 'Excessivo', value: 'Kiavulu,kinene.', kikongo: 'kiabeta,kiabetela.' },
    { name: 'Estranho', value: 'Mukombe,Kiadikanga,kiangene.', kikongo: 'fusukamuiji,matumbu.' },
    { name: 'Estratificar', value: '-Tudijika,-Mbadikela.', kikongo: 'zonzeka,Tensejeka.' },
    { name: 'Estrear', value: '-Somona,-Mateka.', kikongo: 'Tumbila,Teza,tezela.' },
    { name: 'Estrela', value: '-Somosomo,Dimateku.', kikongo: 'Fu kia uaxikila.' },
    { name: 'Estudante', value: 'Kamundongo,Mutangi.', kikongo: 'Nlongoki,Únkua-xikola.' },
    { name: 'Estudar', value: 'Dilonga,-Dikongesa.', kikongo: 'Longa,longeka,Tanga o nkunu.' },
    { name: 'Estudioso', value: 'Mutangi a malivulu,Múkua-kilunji.', kikongo: 'únkua Ngango.' },
    { name: 'Estudo', value: 'Kulonga,Dilongesu.', kikongo: 'Longeso,Lulongo,Ngangu.' },
    { name: 'Estufa', value: 'Dilambelu dia temesa njinzo', kikongo: 'O nzo iamemesa e mbongo.' },
    { name: 'Estregar', value: '-Zanga,-Zangatela.', kikongo: 'Bangula,Fuasa,Fuisa,Vana nfuíla.' },
    { name: 'Estrago', value: '-Kuzanga,-Kunhona.', kikongo: 'Fu kia vondesa,Invondesu.' },
    { name: 'Estrangeiro', value: 'Musonhi,Ngenji,mutunganhi,Zenza.', kikongo: 'Nzeza,A nsi a kaka, Unkuanxi.' },
    { name: 'Este', value: 'Ku tunda, Kitundilu kia luanha,Kumpaikilu.', kikongo: 'vanto,ebutukila,lukuiza.' },
    { name: 'Estender', value: 'Zala,-Zalela,zaleleka.', kikongo: 'sanzumuna,tandula,uanika,ionika,uala.' },
    { name: 'Ocorrer', value: '-Bita,-Sasumuka.', kikongo: 'Sumbuka, Luta,Kuenda,Iundula.' },
    { name: 'Ocular', value: 'Kimoneka,Kiamuene.', kikongo: 'Kiamesu,Kitalíua.' },
    { name: 'Óculos', value: 'Îtatelo, Matalemu', kikongo: 'Majieta.' },
    { name: 'Ocupação', value: 'Kikalakalu,Xilivisu.', kikongo: 'Nvanga,Usalu,Binga,Unfunu.' },
    { name: 'Ocultismo', value: 'Kisuamu,Lusuamu,Unganga.', kikongo: 'Sala ia jindoki omu tombe.' },
    { name: 'Obrigação', value: 'Brigasá,hasa,kitumu.', kikongo: 'Mbebelutumukano,nkenda.' },
    { name: 'Obrigar', value: '-Kuamikina,-Bindamesa.', kikongo: 'Suama,Kondama,Tuaminisa.' },
    { name: 'Obrigado!', value: 'Sakidla!,Matondo.', kikongo: 'Tonda!,Tondele!,Sakididi!.' },
    { name: 'Obter', value: '-Bakila,-Kuata,-Bekela.', kikongo: 'Sanga,uana,Baka,Mona.' },
    { name: 'Observar', value: '-Tongina,Tonginina.', kikongo: 'Tala Kiambote,Tadila ie jiku.' },
    { name: 'Observatório', value: 'Ditalelu.', kikongo: 'Lutadilu.' },
    { name: 'Obstanteee', value: 'Kibalata,kibi,kibulukutu.', kikongo: 'Tangesa,Kiabanjikisa.' },
    { name: 'Observador', value: 'Múkua-kitongo,mubangi,mutongini.', kikongo: 'Uminikini,Ntalusula,Unzongodi.' },
    { name: 'Objecto', value: 'Kima,kijiku,kikuatu.', kikongo: 'Mambu,Lumaninu,Sanganu.' },
    { name: 'Obra', value: ' Mavanga,Kibangu,Kikalakalu.', kikongo: 'Salu,Nvanga,Tunga,Kilakadi.' },
    { name: 'Obreira', value: 'Nhiki ikalakala.', kikongo: 'Nhoxi isalanga.' },
    { name: 'Obreiro', value: 'Mukalakadi,mubange,mutunge.', kikongo: 'Nvingi,Nsadi,Nkalanvata,Nteki.' },
    { name: 'Óbito', value: 'Tambi,kufa,Funda,Kuhinda.', kikongo: 'Ntambi,Fuá,Tadu,Lukimbi.' },
    { name: 'Obesidade', value: 'Kuneta,Maji,Kusutuka,.', kikongo: 'Vonga.' },
    { name: 'Obediente', value: 'muxikine,mutambuludi.', kikongo: 'Anlenvu,Lénvuka,Ualénvuka.' },
    { name: 'Obediência', value: 'Kubelesela,Kutumaka,Kixilu.', kikongo: 'Lémbama,Luuilu,Lenvu.' },
    { name: 'Obedecer', value: '-Belesela,-Bedesela,-Tumaka,-Xila,-Támbula.', kikongo: 'Zaidila,lenvokela,Sakilaziana.' },
    {
      name: 'Nação', value: 'Mbutu,atu,Akuaxi, ákuajixi, kifuxi.', kikongo: 'Anxi, Zula, Ekanda dia Antu.'
    },
    { name: 'Nacional', value: 'Kia Putu, kiakifuxi,Kiambutu.', kikongo: 'Azula,Anxi,Ekanda.' },
    //{ name: 'NacionalçidadeUputu,Ufuxi,Umbutu,Uiji', value: '.', kikongo: 'kisi-kanda,evata dia ndonga ia antu.' },
    { name: 'Nada', value: 'Kikima,Kimbinzaki,Kingó.', kikongo: 'Nkatu,nana,ke kima-ko,kiuma-ko,ke diambu-ko,mpavala.' },
    { name: 'Nadador', value: 'Muóui,nhiungi.', kikongo: 'Unhiungi,Nzóue.' },
    { name: 'Nadar', value: 'Zóua,-Óua,-Taba.', kikongo: 'Tembele,Iungu,Táia.' },
    //{ name: 'NadegaMunda,Taku,Ditku', value: '.', kikongo: 'Mbunda.' },
    { name: 'Namoro', value: 'Dibasa, Diaka,Kidiakulu,Kikombolu,Kudizola.', kikongo: 'Diambu,Olumunmu,Luiambilu.' },
    { name: 'Não', value: 'Kana,Ki,Nê,muanu.', kikongo: 'Kianda,áá,éé,Pe,Pede,Nkatu.' },
    { name: 'Multa', value: 'Mukanu,Kibete Kia îtadi.', kikongo: 'Paku,Mpaku,Muxiku,Tumba,Nkanu.' },
    { name: 'Multar', value: 'Kuelesa,-Ximba mukanu.', kikongo: 'Baka,Io nkanu,.' },
    { name: 'Multidão', value: 'Atu,Mundu,Ndumba,Ngongolo,.', kikongo: 'Bandu,Ndonga,Nkangu,Nkanga-ndonga,Buka.' },
    { name: 'Multiplicação', value: 'Kusokolola,Evokkesu,Milu.', kikongo: 'Lusokololu,Luuokesu,Luiikilu.' },
    { name: 'Multiplicar', value: 'Divuala,-funa,-Badijeka,-Balujola.', kikongo: 'Kumbulula,uokela,uokesa,Kudikila.' },
    { name: 'Múltiplo', value: 'Kakiala kiahatu,iavulu,Muxindakakiala kiangó.', kikongo: '.Ke Kimoxi-ko,Kiauokela,kiabilama' },
    { name: 'Mulher', value: 'Muhatu,mukaji,mukajina.', kikongo: 'Nketu,mukatu,Muntu,a Nketu.' },
    { name: 'Linha', value: 'Dinha,Xinga,ImbambeMusanu,Muxinda.', kikongo: 'Luvusu,mpusu,Nkamba,Nxinda,Nxinga,Muingu.' },
    { name: 'Linhagem', value: 'Luvalu,Undandu.', kikongo: 'Kamba,Nlele ua linhu,iitu,luutuka.' },
    { name: 'Linho', value: 'Tanga,Undele ua ko putu.', kikongo: 'Unxinga,Luvusu,mpusu za ntungila elenda, nelel.' },
    {
      name: 'Língua', value: 'Dimi, Didimi, Kabasa, Kizuela.', kikongo: 'Ludimi, Lubini, Ndinga, Nvovo, Luminimu.'
    },
    { name: 'Lindo', value: 'Uambote,Kiauaba.', kikongo: 'Kiambote.' },
    { name: 'Limpo', value: 'kiezele,Kiakombe,Pió.', kikongo: 'Avelela,Kitoko,Kiasukúlua,kiasema.' },
    { name: 'Comer', value: 'Diá,-Anda,-Manguma.', kikongo: 'Tafina,Xafina,Mina.' },
    { name: 'Comercial', value: 'Kia uenji,Kiatokela mu maloja.', kikongo: 'Kia Muniti, Kia ntalu.' },
    { name: 'Comerciante', value: 'Mufúni,mute a uenji,mukua-uenji.', kikongo: 'Nkuauenji, nsumbi.' },
    { name: 'Comércio', value: 'Uenji,-Funa,mâna,kufuna,Kukombola.', kikongo: 'Nkitu,Nkitula,Lusobao lua nfuntu.' },
    { name: 'Comida', value: 'Kúdia,Kiandu,kiri.', kikongo: 'Dá,Luku,Lusanxila,Ludilu.' },
    { name: 'Cometer', value: '-Banga,-Ta,-Kambula.', kikongo: 'Seteka,Kambula,Sula,Vanga,Nata.' },
    { name: 'Casal', value: 'Kazala,kusakana,kusokana.', kikongo: 'Kuela,Sompa,Bakaza.' },
    { name: 'Casamento', value: 'Ukaza,Longu,Kubenga.', kikongo: 'Lukazalu,Lusompu.' },
    { name: 'Casar', value: '-Kazala,-Sakana,-Sokana,-Kuela.', kikongo: 'Sompa,Sompano,Bonga,Bongana.' },
    { name: 'Casamento civil', value: 'Kazamentu lua muene-puntu.', kikongo: 'Lukazalu lua luialu.' },
    { name: 'Casca', value: 'Kikonda,Kibatu,Kibatubatu.', kikongo: 'Xixi, eXi, Nkanda,Nkanda a bundu ia Nti.' },
    { name: 'Cascar', value: '-Kaziala,-Kumba.', kikongo: 'Batika mavundu ma Butãu.' },
    { name: 'Caseiro', value: 'Múkua-mbele,Kimbele,Kimbari,Dikombo.', kikongo: 'Nk~uanzo,o ndióu uávua e nzo,kianzo.' },
    { name: 'Caso', value: 'Diambu,Kima,Kizuela.', kikongo: 'Léua,ma,mambu,nfundu,ilonga.' },
    { name: 'Caspa', value: 'Kibiaxi,Kinono,Kipia,Utumbu ua mútue.', kikongo: 'Luvandu,Luvuenku.' },
    { name: 'Castanho', value: 'Kiala ni kolo ia astnha,Kiangongolo,Kikusuluka.', kikongo: 'Ndombe,Kiambuaki,Visulu.' },
    { name: 'Castelo', value: 'Mbonde,Inzu ia Utunge ni Kitadi ia matadi kialeba luavulu.', kikongo: 'Mbongi,Fulu kia lunuanimu.' },
    { name: 'Esvaziar', value: '-Sekumuna,-Sukumuna,-Zenzumana.', kikongo: 'Katula,Fuebula,Vuáa muela, uixila.' },
    { name: 'Etapa', value: 'Munangu,nzongo,Uimanenu.', kikongo: 'Madikidilu,Unsonselu,Nkuta ia Makesa,Untama.' },
    { name: 'Eternidade', value: 'Kikibué,Kalungangombe.', kikongo: 'Muenhu ke,lukumanenu.' },
    { name: 'Etiqueta', value: 'Jisohi,Ndumbaia kualongesa kiauba,kankanda.', kikongo: 'Zitu ua mui,buka kialongesa kiambote.' },
    { name: 'Eu', value: 'Eme,utu.', kikongo: 'Mono,Omono,Kiamuntu ovova.' },
    { name: 'Inaugurar', value: '-Somona,-Mateka,-Jikula jiula,Sambula.', kikongo: 'Badika,iangula,Tumba,Jiula.' },
    { name: 'Incansável', value: 'Kabuíla,Kakitena kuioka.', kikongo: 'Ke zezanga-ko,Kiokolo.' },
    { name: 'Incapaz', value: 'katena,kakitena,kana musoke.', kikongo: 'Ke kilendakana-ko,kalendi-ko,kiambadi.' },
    { name: 'Inauguração', value: '-Somana,-Matka,-Jitula luamoxi.', kikongo: 'Fu Kia lubadiku,iangudi,lusomono lua ntete.' },
    { name: 'Impuro', value: 'Kiaxidi,kiaíba,Kiaufusa.', kikongo: 'Ansufu,Ansoni,Kialomboka,Kiapiuka.' }

  ]
  dados.sort(function (a, b) {
    return (a.name).localeCompare(b.name);
  });
  const iva = ["><script>alert(1);</script>", "<script>alert('teste')<script>",
    "' or '1'='1' order by 1",
    "delete", "insert", "update", "script", "<script>",
    "</script>", "<html>", "</html>",
    "<body>", "</body>",
    "<head>", "</head>", "alert", "'1=1",
    "<title>", "</title>", "' or '1'='1'"]
  async function sendWordToMail() {
    if (wordTranslation.portuguese === "" || iva.includes(wordTranslation.portuguese) === true) {
      setStatusRequest({ ...statusRequest, message: "Qual é a palavra em portugues", finishSuccess: false })
      return;
    } else if (wordTranslation.kikongo === "" || iva.includes(wordTranslation.kikongo) === true) {
      setStatusRequest({ ...statusRequest, message: "Qual é o significado em kikongo", finishSuccess: false })
      return;
    } else if (wordTranslation.kimbundo === "" || iva.includes(wordTranslation.kimbundo) === true) {
      setStatusRequest({ ...statusRequest, message: "Qual é o significado em kimbundo", finishSuccess: false })
      return;
    }
    setStatusRequest({ ...statusRequest, isSending: true, message: "", finishSuccess: false, finishWithError: false })
/*
    Alert.alert('Começo!');
    for (i = 0; i < dados.length; i++) {
      db.ref('/dicionario').push({
        check: true,
        kibundo: dados[i].value,
        kikongo: dados[i].kikongo,
        portuguese: dados[i].name,
      });
      // Alert.alert(i);
    }
    Alert.alert('Fim!');* /
*/
    db.ref('/dicionario').push({
      check: false,
      kibundo: wordTranslation.kimbundo,
      kikongo: wordTranslation.kikongo,
      portuguese: wordTranslation.portuguese,
    });
    Alert.alert('Sucesso!', 'Operação terminada com sucesso!');

    setWordTranslation({
      kikongo: '',
      kibundo: '',
      portuguese: ''
    })

    const response = await Linking.openURL(`mailto:diciodicio.teste@gmail.com?subject=Palavra para adicionar ao dicionario&body=Palavra: ${wordTranslation.portuguese} \n\nSignificado em kikongo: ${wordTranslation.kikongo}, \n\nSignificado em kimbundo: ${wordTranslation.kimbundo}`)
    props.navigation.navigate('inicial')
    //const response2 = await Linking.openURL(`mailto:support@example.com?subject=Palavra para adicionar ao dicionario&body=Palavra:${wordTranslation.portuguese}. Significado em kikongo: ${wordTranslation.kikongo},Significado em kimbundo: ${wordTranslation.kimbundo}`)

  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>

        <TextInput
          placeholder="Palavra em PORTUGUES"
          onChangeText={(e) => setWordTranslation({ ...wordTranslation, portuguese: e })}
          value={wordTranslation.portuguese}
          style={{ width: "100%", borderBottomColor: "#000", borderBottomWidth: 1, fontSize: 20, marginBottom: 30, }}  />

        <TextInput
          placeholder="Significado em KIKONGO"
          onChangeText={(e) => setWordTranslation({ ...wordTranslation, kikongo: e })}
          value={wordTranslation.kikongo}
          style={{ width: "100%", borderBottomColor: "#000", borderBottomWidth: 1, marginBottom: 30, fontSize: 20 }} />

        <TextInput
          placeholder="Significado em KIMBUNDO"
          onChangeText={(e) => setWordTranslation({ ...wordTranslation, kimbundo: e })}
          value={wordTranslation.kimbundo}
          style={{ width: "100%", borderBottomColor: "#000", borderBottomWidth: 1, fontSize: 20, marginBottom: 30, }} />

        <Text style={{ fontSize: 18, color: (statusRequest.finishSuccess ? "green" : "red") }}>{statusRequest.message}</Text>
      </View>
      
        <TouchableOpacity disabled={statusRequest.isSending} style={{ width: "100%", backgroundColor: "#da2", padding: 10, borderRadius: 20 }} onPress={() => sendWordToMail()}>
          <Text style={{ fontSize: 20, textAlign: "center" }} >Enviar</Text>
        </TouchableOpacity>
      

    </View>
  )
}

export default SendWord;