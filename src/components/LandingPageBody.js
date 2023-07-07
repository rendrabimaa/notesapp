import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function LandingPageBody() {
return (
<main>
<section className="home" id="home">
<div className="content">
<h3> PENGAMBILAN CATATAN CORNELL </h3>
<span> METODE UNTUK MENGAMBIL CATATAN YANG BAGUS</span>
<p> </p>
<a href="/login" className="button-home" > Mulai</a>
</div>
<div className="overlay"></div>
        </section>
        <section className="about" id="about">
            <h1 className="heading">
                Aplikasi <span> Cornell Notes </span> yang hilang.
            </h1>
            <h2 className="heading-2"> Kini tersedia di website</h2>
            <div className="row">
                <div className="img-container">
                    <LazyLoadImage
                        alt="section-img"
                        src="CornellNotes.webp"
                        effect="opacity"
                    />
                </div>
            </div>
            <div className="content">
                <p>
                    Tidak perlu lagi memaksa pengolah kata untuk melakukan apa yang tidak dirancang untuk dilakukan. Ambil catatan Cornell, lengkap dengan judul, kolom cue, kolom detail, dan ringkasan. Gunakan pemformatan teks kustom untuk memberikan struktur pada catatan Anda dan membuat poin-poin penting menjadi menonjol. Edit dan atur ulang catatan Anda seiring dengan kebutuhan. Susun lembaran Anda ke dalam folder sehingga Anda dapat mengambil catatan untuk semua kelas atau proyek yang berbeda. Gunakan bilah Pencarian Kosmis untuk mencari melalui semua lembaran, catatan, dan ringkasan Anda. Hasilnya akan difilter dan disorot secara real-time saat Anda mengetik. Tandai lembaran agar Anda dapat mengaksesnya dengan cepat. Dan ketika Anda selesai, ekspor ke printer atau dalam format PDF.
                </p>
            </div>
        </section>
    </main>

);
}

export default LandingPageBody;





