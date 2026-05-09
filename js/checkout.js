/**
 * Skrip khusus untuk alur checkout One Memory
 */

const productData = {
    mini: {
        name: "Mini box",
        subtitle: "Cocok untuk hadiah kecil dan momen sederhana",
        price: "Rp 35.000",
        rawPrice: 35000,
        image: "assets/mini-box.png",
        desc: "Mini Box adalah kotak kenangan berukuran mungil yang dirancang untuk menyimpan memori singkat namun manis. Cocok untuk hadiah sederhana namun berkesan."
    },
    reguler: {
        name: "Reguler Box",
        subtitle: "Pilihan pas untuk semua momen spesial. berisi foto, kartu ucapan, dan aksesoris pilihan",
        price: "Rp 45.000",
        rawPrice: 45000,
        image: "assets/reguler-box.png",
        desc: "Reguler Box adalah kotak kenangan dengan ukuran ideal yang menawarkan keseimbangan antara kapasitas dan kepraktisan. Di dalamnya berisi foto, kartu ucapan, dan aksesoris pilihan yang disusun secara rapi dan estetik untuk menciptakan pengalaman yang berkesan. Cocok digunakan untuk berbagai momen spesial seperti ulang tahun, anniversary, atau hadiah untuk orang terdekat. Dengan ukuran yang tidak terlalu kecil maupun besar, Reguler Box menjadi pilihan tepat untuk menyimpan dan menyampaikan kenangan dengan cara yang lebih lengkap dan bermakna."
    },
    jumbo: {
        name: "Jumbo box",
        subtitle: "Pilihan terbaik untuk momen spesial, berisi lebih banyak foto, kartu ucapan, dan aksesoris pilihan dalam tampilan yang lebih lengkap dan berkesan.",
        price: "Rp 65.000",
        rawPrice: 65000,
        image: "assets/jumbo-box.png",
        desc: "Jumbo Box adalah kotak kenangan berukuran besar yang dirancang untuk menghadirkan pengalaman yang lebih lengkap dan berkesan. Di dalamnya berisi lebih banyak foto, kartu ucapan, serta berbagai aksesoris pilihan yang disusun secara detail dan estetik. Cocok untuk momen besar seperti ulang tahun spesial, anniversary, atau perayaan penting lainnya. Dengan ukuran yang lebih luas, setiap elemen di dalam Jumbo Box mampu menyampaikan cerita dan perasaan secara lebih mendalam, memberikan kejutan di setiap lapisan, dan menciptakan kesan yang tak terlupakan."
    }
};

// Formatting currency
const formatCurrency = (amount) => {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

document.addEventListener('DOMContentLoaded', () => {

    const selectedType = localStorage.getItem('selectedBox') || 'reguler';
    const activeProduct = productData[selectedType];
    
    // DETAIL PAGE POPULATION
    const titleEl = document.getElementById('product-title');
    if (titleEl && activeProduct) {
        titleEl.textContent = activeProduct.name;
        document.getElementById('product-subtitle').textContent = activeProduct.subtitle;
        document.getElementById('product-price').textContent = activeProduct.price;
        document.getElementById('product-desc').textContent = activeProduct.desc;
        
        // Update product image
        const mgMain = document.querySelector('.mg-main');
        if (mgMain) {
            mgMain.style.backgroundImage = `url('${activeProduct.image}')`;
        }
    }

    // REVIEW PAGE POPULATION
    const reviewProduct = document.getElementById('review-product');
    if (reviewProduct && activeProduct) {
        reviewProduct.textContent = activeProduct.name;
        
        const reviewColor = document.getElementById('review-color');
        const savedColor = localStorage.getItem('selectedColor') || 'Cokelat';
        if(reviewColor) reviewColor.textContent = savedColor;
        
        const reviewQty = document.getElementById('review-qty');
        const savedQty = parseInt(localStorage.getItem('selectedQty') || '1');
        if(reviewQty) reviewQty.textContent = savedQty + 'x';
        
        const reviewTotal = document.getElementById('review-total');
        if(reviewTotal) reviewTotal.textContent = formatCurrency(activeProduct.rawPrice * savedQty);
    }

    // Quantity Selector Logic
    const btnMin = document.getElementById('qty-min');
    const btnPlus = document.getElementById('qty-plus');
    const qtyVal = document.getElementById('qty-val');

    if (btnMin && btnPlus && qtyVal) {
        // Init from storage if returning back
        let currentQty = parseInt(localStorage.getItem('selectedQty') || '1');
        qtyVal.innerText = currentQty;

        btnMin.addEventListener('click', () => {
            if (currentQty > 1) {
                currentQty--;
                qtyVal.innerText = currentQty;
                localStorage.setItem('selectedQty', currentQty);
            }
        });

        btnPlus.addEventListener('click', () => {
            currentQty++;
            qtyVal.innerText = currentQty;
            localStorage.setItem('selectedQty', currentQty);
        });
        
        // Save initial state
        localStorage.setItem('selectedQty', currentQty);
    }

    // Color Swatch Selection Logic
    const swatches = document.querySelectorAll('.swatch-item');
    if (swatches.length > 0) {
        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                // Remove active class from all
                swatches.forEach(s => s.classList.remove('active'));
                // Add active class to clicked
                swatch.classList.add('active');
                
                // Save selection
                const colorLabel = swatch.querySelector('.swatch-label').textContent;
                localStorage.setItem('selectedColor', colorLabel);
            });
        });
        // Default color save if empty
        if(!localStorage.getItem('selectedColor')) {
             localStorage.setItem('selectedColor', 'Cokelat');
        }
    }

    // Upload Photo simple logic (visual only for front-end mockup)
    const dropzone = document.getElementById('upload-dropzone');
    if (dropzone) {
        dropzone.addEventListener('click', () => {
            alert('File picker (Simulasi)');
        });

        // Prevention for drag & drop
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.backgroundColor = '#E2CDBA';
        });

        dropzone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropzone.style.backgroundColor = '#EEDDCC';
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.backgroundColor = '#EEDDCC';
            alert('File dijatuhkan! (Simulasi)');
        });
    }

    // Remove Photo logic
    const removeBtns = document.querySelectorAll('.photo-remove');
    if (removeBtns.length > 0) {
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const thumb = e.target.closest('.photo-thumb');
                if(thumb) {
                    thumb.style.display = 'none';
                }
            });
        });
    }
});
