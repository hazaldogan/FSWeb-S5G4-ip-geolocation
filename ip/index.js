//axios import buraya gelecek
import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
*/

function getIpLocationData(ip) {
  axios
    .get("https://apis.ergineer.com/ipgeoapi/" + ip)
    .then((res) => {
      console.log(res);
      cardCreator(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}
/*
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/
// getIpLocationData("88.236.182.59");

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/

const sampleStaticData = {
  sorgu: "88.236.182.59",
  durum: "OK",
  kıta: "Asia",
  ülke: "Turkey",
  ülkeKodu: "TR",
  ülkebayrağı: "https://apis.ergineer.com/ulkebayraklari/TR",
  bölge: "58",
  bölgeAdı: "Sivas",
  şehir: "Sivas",
  zip: "58000",
  enlem: 39.59420000000000072759576141834259033203125,
  boylam: 36.90650000000000119371179607696831226348876953125,
  saatdilimi: "Europe/Istanbul",
  parabirimi: "TRY",
  isp: "Turk Telekomunikasyon A.S",
  organizasyon: "TurkTelecom",
  as: "AS9121 Turk Telekomunikasyon Anonim Sirketi",
};

/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/
const cardCreator = (data) => {
  const card = `<div class="card">
	<img src="https://flagcdn.com/w320/${data["ülkeKodu"].toLowerCase()}.png" />
	<div class="card-info">
		<h3 class="ip">${data["sorgu"]}</h3>
		<p class="ulke">${data["ülkeKodu"]}</p>
		<p>Enlem: ${data["enlem"]} Boylam: ${data["boylam"]}</p>
		<p>Şehir: ${data["şehir"]}</p>
		<p>Saat dilimi: ${data["saatdilimi"]}</p>
		<p>Para birimi: ${data["parabirimi"]}</p>
		<p>ISP: ${data["isp"]}</p>
	</div>
    </div>`;
  document.querySelector(".cards").innerHTML = card;
  //return card;
};
//cardCreator(sampleStaticData);
/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek
async function runApp() {
  await ipAdresimiAl();
  getIpLocationData(benimIP);
}
runApp();
