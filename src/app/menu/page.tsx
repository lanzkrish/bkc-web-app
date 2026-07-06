"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function MenuPage() {
  const [activeSection, setActiveSection] = useState("starters");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Trigger when the section reaches the top area
      }
    );

    const sections = document.querySelectorAll(".category-anchor");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const getLinkClass = (id: string) => {
    return activeSection === id
      ? "font-label-caps text-label-caps px-6 py-2 rounded-full bg-primary text-white transition-colors uppercase tracking-widest"
      : "font-label-caps text-label-caps px-6 py-2 rounded-full bg-surface text-text-secondary hover:bg-primary hover:text-white transition-colors uppercase tracking-widest";
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            className="w-full h-full object-cover"
            alt="Cinematic shot of restaurant interior"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALqVyUUL104K--y8d1gcmbQ4XZgloQRFIJCMkK27742Q1K36_UJwoYCLHYkY7B4jLUwVYNqfzhwxoDhsJBFFweipi8wOxjZQ4i4rG_TUeS7Li1QHALVOYFn7xKFDXsrl-1hfkEmxDLeKklAJHE9hTFfilrWddjIZYD8rSmFM3fkMQjgbbP4j4fKi_lbUVNXuYlh6cKhDiHQrbjYcpM5702-Xq8dp3SM7xSpyqGC58edxGSgSOx3DwxRVDQH9SfTIRqCVARshew8Biz"
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <span className="font-label-caps text-label-caps text-gold mb-4 block tracking-[0.3em]">CRAFTED WITH PASSION</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-light mb-6">Culinary Excellence</h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-text-light/80">Explore a symphony of flavors curated from traditional heritage and modern innovation.</p>
        </div>
      </section>

      {/* Category Shortcuts */}
      <section className="sticky top-[80px] z-40 bg-background/90 backdrop-blur-md border-b border-border-custom py-4">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-start md:justify-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <a className={getLinkClass("starters")} href="#starters">Starters</a>
          <a className={getLinkClass("main-course")} href="#main-course">Main Course</a>
          <a className={getLinkClass("biryanis")} href="#biryanis">Signature Biryanis</a>
          <a className={getLinkClass("desserts")} href="#desserts">Desserts</a>
          <a className={getLinkClass("beverages")} href="#beverages">Beverages</a>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
        {/* Category: Starters */}
        <section className="category-anchor mb-section-gap" id="starters">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Starters</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">01</span>
          </div>
          <div className="menu-grid">
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Truffle Arancini" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTk8lyZgR5LR1uITK5zWs_LMCrB2ICi04hnjozCvKUcH-OSInlg2BmcwRAYGwtgTtn2SEEpHsWW4ehME1FWzv-KaiwhGT4bnbhPyhMjstZR-T25046c-pvzG5Jeg0U9ruykdK_kUB7gL0e-yP0rdsfZcPz6DA9366qmktTAyK4mtoUddt57a48-nAOAZzEeV3bN5vhfWua5VLWaMcy9WnWHD0fRyL_oCernmOWjbbIZzjK0wdNATByP-zwRw2FaMczsywjuzAa4Gl1" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Truffle Arancini</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹450</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">Crispy risotto balls infused with black truffle oil, served with a delicate saffron aioli.</p>
              </div>
            </div>
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Peri Peri Prawns" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRZv1RL_jkEwN-yUvHUsdH8wXi1vHVwPVDtJQMqSPsOS7XInMFXXYHwsIom-uHPFgG7DgFXfu_P8XxgkAC1bGiJJO4QXp1NW8dkiAmhuQT1jO1j9U4E_DK_dwIwmkKyHckxLq_tKhnarRTlub-skj-MvT9FIghyagC4W1rp2IkawA-6FDAZpOZHnWx0j2xyBYPEeSuk7jHf81hzvSpRZStEee50lq1TTWjsyvVBMrHHfM24nMT300O5WoNph3OdzzMc2WDS6njoSKI" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Peri Peri Prawns</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹680</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">Grilled tiger prawns marinated in a spicy house-made peri-peri glaze with lemon zest.</p>
              </div>
            </div>
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Mezze Platter" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkNhhv2hSYoSeP-vkOtpjhj6iMShtjAyRo3PBNH6gTz07ZHN63nl5LmIwksv0JyvmqP1V4CxiExpuehqcdk6wLejHrRozA1PK9_oHvrNbtMMwr0RjmmsdJTjr1b0S1vfO_mmGkjvxHhd_pVn3pT1HbdNls7A4kgjtcAXZw0fpeQneLayO4sbZQIx0bPiCUFSj8DwLFAg8qYbUiy4kAsbA12tWOCKxcR6_lNFLjqZt5v2P3uQW-Yk3Gl0eOJBjW0wAtsc5c2a2SAcmg" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Mezze Platter</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹520</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">A curation of roasted beet hummus, smoky baba ganoush, and herb-infused flatbreads.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category: Main Course */}
        <section className="category-anchor mb-section-gap" id="main-course">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Main Course</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">02</span>
          </div>
          <div className="menu-grid">
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Atlantic Salmon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZKLJ14Su_vJiHmy5Jk-RVXWX7kRZWyLKRBSIaMZeW3uJOLX7rvOvdHu7RMeFVoCP322CkXNwzNtJLT4_nVoSTx_Ji8mB_LaSsNS8QRKMKw02xhTF7PuTx-ZIHuYuXno1GyDsuQ4A8mQywfob1RtXQwdgcrTyBSeLHs_ngdDKxYlyGnanvWa1qywKH4HsAZSICytGRfITA17S3a5C6xvrQsLT9_jvUg-gUZriCTZNCNHNMzvlB1fJ1V0JRAk0S859uhHBANY15G8OI" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Atlantic Salmon</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹1250</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">Pan-seared salmon with a citrus reduction, seasonal greens, and crushed baby potatoes.</p>
              </div>
            </div>
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Herb Roasted Lamb" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYWl3LHhoE554XVoV9GrnAIIC0pe7WWVpElIauK8Ootf0zN_8oAN_rRZ-yQy4BGHdev-iZSWNpE5gTvEfj8Yoeh2Yvj2iaYGR52XP7x2ICjd-JvDGSqf6EAssAz9W82njq9Tz775oXgEdHEL5kUNaT6LSPIL4NKRzH-y6ZyqjAe0lYxu1gQqQ_pUcm9E8_A4ZZQL_HWaZM5WW-7Gdx_ovdDVJyxHcKOHzoHqp2PKU4YxwkzNFe_CFjBdE3Lf6yQRMIbvxMSYivoTdf" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Herb Roasted Lamb</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹1450</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">Slow-cooked lamb chops infused with rosemary, served with truffle-infused mash.</p>
              </div>
            </div>
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Wild Mushroom Risotto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0woEiPkU04kVNN87EPsPbQArOUiistNKeFDhS3KMRWhIO3AHq8wFZ9bnou6qnwf27PLfzzD1ZFVyr8Jj9Ga8uxP7MYhLltJVz3JBrq-RAkkHc6BOietXNvPpSHuNkzT1j3qGSP-8BJ-PMFAFqKwCWX1HMKBugaZusr62p4esFn19eS9NIaYqKbYGRCcEyzIF6__3GLQqhPgXf9l0Drs4DR1WJOr-1gcQEtERJaYuJVXDXYCBRccpp25cEXocNnoB7xQCYm41tz4DQ" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Wild Mushroom Risotto</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹850</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">A creamy arborio rice dish with porcini mushrooms, finished with vintage parmesan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category: Signature Biryanis */}
        <section className="category-anchor mb-section-gap" id="biryanis">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Signature Biryanis</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">03</span>
          </div>
          <div className="menu-grid">
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Nizami Dum Biryani" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUPiRNcEGuEIOqA7AeXH1SX8m7CZ_UOtTLHkh5kLyYd8-fTOi8QdOZguca--CiCumURP0hW9sRVKLDepLnDYYsvt8uzGaYS8wB_nPpiPL4W4kncPpTvtPGutkHKheC4cRZ875NbhlmZ6LWI9f8gVZ3M7AzQTxrb1pnmdcpe19Jb92ZrSZKsBf5vvbLXpMjSPE_-wm9Uke6ltsLhHiRUQu8JmvVEKjwgyPiTq2QXG0sJD3kEeR_ECqPzDlszrX9jhQcB3aIpyD4OS9B" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Nizami Dum Biryani</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹720</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">Slow-cooked succulent lamb with long-grain basmati rice and secret royal spices.</p>
              </div>
            </div>
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Saffron Chicken Biryani" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1MktCLp3ovnKkkIjOXotrjCIOGfzT-Ib1PiFBwV5Wqn9Oc-PjsQcY5c21v2QgW63flZ35IX7U67J2Jf9i2S0yzo6utDA01RvkdJDA46oWwOQWMNXeZBRjsuIkwezDkQ1rk5pZVPVggVar-yYPfpos4KlcsC4iJ-RLbu7HQ781hmkWtxocu9XfO4U2yYUP1QYGQ1YwlIG3nd7mDSIBCX8dLwxX1P64xN98kwExpytz6TrPSWexW02XBBuHtfzdQA2gyDYXKD-_WkB6" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Saffron Chicken Biryani</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹650</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">Classic aromatic chicken biryani with premium saffron and house-made garam masala.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category: Desserts */}
        <section className="category-anchor mb-section-gap" id="desserts">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Desserts</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">04</span>
          </div>
          <div className="menu-grid">
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Obsidian Fondant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW4FqUIZ6nmS29Pr0_R53tBg0QTVG2Bw1OCNMYlJzcK6a0zw3FZV14hh8HyKiHxuWBeZjmDvMZkQvO9PMa83ALmNtb8lS-8q6OXwGfYlxdJ_1hbqeuZAc6VuqQjAJtHqK5ZwhGKYRmPohT-ZYlllq3F8dZ8KMmiBhKXtePMoN2xYOQqNrSMk9pM47j8bPS0Yc7Un5y81lmVMCAycXgYhvuP9UiyJhKlnIGsNwNyFtpf2X9so39SUyyugUvHNAixW1NY1_vkCul7cBc" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Obsidian Fondant</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹420</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">Dark Belgian chocolate molten cake served with edible gold leaf and vanilla bean gelato.</p>
              </div>
            </div>
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Passion Fruit Panna Cotta" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsCx83dqEZ-Y9mLTGHV28JyMuWbm1L8Ml8qppDV4Op9-Qn5Ex6kV_ulgmdfplCSsQyBlpOpYa-DqPzQCYSDXlrmIfSEwDjEM6sHHyXaC7MyrnEXsFXjS59wOhoiijVdB1SJTdsasaHcPK2AJmMXeAx7-zFfnfrRxOebWB2QN_VLc81zC-9OafqHpWOh2WYSijRCq8PxnstJRuExdATQ3S8pP70NtzC4RxVKxcUzA9ThrIdgnfkXFDZM1048gvF3rknTylYoFlgfc29" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Passion Fruit Panna Cotta</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹380</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">Silky cream pudding topped with a zesty passion fruit glaze and fresh mint.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category: Beverages */}
        <section className="category-anchor" id="beverages">
          <div className="flex items-baseline gap-6 mb-12">
            <h2 className="font-headline-md text-headline-md text-text-main">Beverages</h2>
            <div className="flex-grow h-[1px] bg-border-custom"></div>
            <span className="font-label-caps text-label-caps text-primary">05</span>
          </div>
          <div className="menu-grid">
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Smoked Signature" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAretVutjCqrS3Ie4MTMAd9kADda_fQmpB2-RPYwt24MCu4gyPzeLAG7akN7BUBeZPufNTX6v2wwvY4E5SKiSN8fGytr2Upqn4Bw6fELqMWYjboi1df5kobgBMa7ckr4pbKswGIg17kG2m61MVjjEdxwcKTzVO_fH4Fv8dPAxJ56mRUCL2vNfpYjZ26abuXz28O45_X1Ja6MVK4mVZIW8A9V6m_6cZxtFHzatqZR2f6daSARvsHYPzoSV0t_drnCBmOcI6PU5WIu6GX" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Smoked Signature</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹550</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">House-special smoked mocktail infused with cinnamon, citrus, and oak-wood smoke.</p>
              </div>
            </div>
            <div className="card group">
              <div className="aspect-[4/3] overflow-hidden image-zoom">
                <img className="w-full h-full object-cover transition-transform duration-700 gallery-img rounded-b-none" alt="Nitro Cold Brew" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbtay4EKBj9zKRCVmh_lm5AndlPq83LJ5BZh3mPC9kfA6uNpCyMskLNV6Qay-EXSC6tJbTYWHwYWSq9aJPb5uY7_uzUdS9VnUVT3j8mdffUTmND5AMZRu364ryyk67khQG5J7SXnPNEkOycJejG0y_9w6jh0_NsnHUePEggmbEgMYl227aFUdtifslceg61HHq6WZqrckQh8XPbqQQZxhCVesZjqYmjRXvFLxNjF9bOO-si5H612UUwnCaKao9AJAdVKNt-mpwRUKV" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-text-main group-hover:text-primary transition-colors">Nitro Cold Brew</h3>
                  <span className="font-body-lg text-primary-dark font-bold">₹280</span>
                </div>
                <p className="font-body-md text-text-secondary line-clamp-2">18-hour cold brew infused with nitrogen for a velvety, creamy texture.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
