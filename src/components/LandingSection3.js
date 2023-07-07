import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function LandingPageSection3() {
return (
<section className="icons-container">
<div className="icons">
<div className="info">
<h3>Mempertahankan lebih banyak dari apa yang Anda pelajari</h3>
<span>Mengambil catatan secara efisien.</span>
<br />
<br />
<h3>Tidak ada persiapan yang diperlukan</h3>
<span>Tidak perlu lagi memaksa pengolah kata untuk melakukan apa yang tidak dirancang untuk dilakukan, atau menggambar garis di atas kertas.
</span>
<br />
<br />
<h3>Mengambil catatan yang lebih baik</h3>
<span>Saat rapat, mendengarkan kuliah, menonton film, atau membaca buku.
</span>
</div>
</div>
<div className="icons">
<div className="info_img">
<LazyLoadImage
                         alt="section-img2"
                         src="icon-cartoon.png"
                         effect="opacity"
                     />
</div>
</div>

        <div className="icons">
        <div className="info">
                <h3>Pengeditan Mudah</h3>
                <span>Catatan adalah sebuah proses. Kembali dan lakukan pengeditan.</span>
                <br />
                <br />
                <h3>Pencarian Semua</h3>
                <span>Jika Anda pernah menuliskannya di Note IT!, Anda dapat dengan cepat menemukannya menggunakan bilah Pencarian.
                </span>
                <br />
                <br />
                <h3>Shortcut Keyboard</h3>
                <span>Navigasi melalui lembaran, menulis, dan menerapkan pemformatan hanya dengan menggunakan keyboard Anda.

                </span>
            </div>
        </div>
    </section>

)
}

export default LandingPageSection3;