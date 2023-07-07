import React from "react";
import LandingPageFooter from "../components/Footer";
import LandingPageBody from "../components/LandingPageBody";
import LandingPageSection from "../components/LandingPageSection";
import LandingPageSection2 from "../components/LandingSection2";
import LandingPageSection3 from "../components/LandingSection3";
import Navigation from "../components/Navigation";

function LandingPage() {
return (
<>
<Navigation />
<LandingPageBody />
<LandingPageSection
image={"taking-notes.png"}
title={"Mensintesis & menerapkan pengetahuan yang dipelajari"}
subtitle={
"Tanpa mengambil catatan, hanya 10% dari apa yang Anda dengar yang dapat bertahan dalam ingatan. Dengan mengambil catatan yang baik, angka tersebut bisa mencapai lebih dari 80%. Meskipun ada manfaat dari pengambilan catatan, 1 dari setiap 3 siswa tidak mengambil catatan."
}
subtitle2={"Pengambilan catatan Cornell adalah salah satu format pengambilan catatan yang paling sering direkomendasikan oleh perguruan tinggi dan sekolah menengah. Ini membantu Anda mengambil catatan yang berguna dengan cara yang efisien, sehingga catatan dapat digunakan untuk ulasan dan pengujian diri. Ambil catatan yang lebih baik dengan Note IT!"}
/>
<LandingPageSection2
image={"search-notes.png"}
title={"Cari Semua Catatan Anda dengan Cepat"}
subtitle={"Gunakan Pencarian Kosmis untuk mencari melalui semua lembaran, catatan, dan ringkasan di setiap folder. Hasil akan disorot dan difilter secara real-time saat Anda mengetik. Klik pada hasil pencarian untuk menuju ke lembaran tersebut."}
subtitle2={"Terapkan sistem tagging sendiri hanya dengan menggunakan teks dan pencarian. Jika Anda pernah menulisnya, Anda bisa menemukannya."}
/>
<LandingPageSection
image={"light-or-dark.png"}
title={"Terang atau Gelap"}
subtitle={
"Sinar matahari menyakitkan mata Anda? Begadang semalaman? Tidak ingin membangunkan teman sekamar Anda? Matikan lampu. Klik bulan sabit di kanan atas untuk beralih ke mode gelap."
}
subtitle2={"Beralih ke mode terang dengan mengklik matahari di sebelah bulan. Pengaturan ini akan diingat ketika Anda menutup aplikasi."}
/>
<LandingPageSection2
image={"Upload-bro.png"}
title={"Ekspor Catatan Anda"}
subtitle={"Kapan saja, Anda dapat mencetak catatan Anda atau mengekspornya sebagai PDF untuk dibagikan kepada orang lain atau ulasan di luar aplikasi seperti di Preview, atau pada perangkat lainnya. Anda dapat dengan mudah mengekspor catatan Anda dengan Note IT!"}
subtitle2={"Lembaran yang diekspor adalah catatan Cornell dua kolom yang lengkap, termasuk judul, catatan, dan ringkasan, dan dapat berupa beberapa halaman."}
/>
<LandingPageSection3 />
<LandingPageFooter />
</>
)
}

export default LandingPage;