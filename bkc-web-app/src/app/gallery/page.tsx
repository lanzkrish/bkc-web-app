

export default function GalleryPage() {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAbs7aWG73tjjOeZgZTylH_BoMudhfnUraCWstltVJD5y8Xbb0IszHZL5CVOAmnLDupyOFaLBc6heq8obMuKLx4rl3SXHCnuANfR7vLiMQl0nYben_FyQAb7ISJyFjPNjg6_rR5SLzrovcANNfAPE3CauMevxw6zciDe81gdXxQZUWbT6sSUdsxymLeMyAIMZbvyNbjDw24IT5QV-r5IxvL-rgHahrwweZlXAhvsLATFcd52HWw-rIWSnxhb46JgwzDRJi-bkOtb6tg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQQMuZIQ1ipkQWR4fnWJ01CnKjBCN2joMEI67pmegINZoMASuQe9WqNUjAumyx2VyWOQL-V2MAqAhiwcLSJq1mu6GkA_3QAt4ZzQ2FiLpe36rLfJ8q8aIJFN3BhoO1BCBubKz-JWWlhD_nruA4Wo8KFFfO0av7wmfd9rx9UgVe4DCNb8aQ-h0pFpnVv67MLSJW4rc6_-297dquYwNFZrM4tcrOqHXp62Gw_h4Xfs7-q6eWyzmcjgiPfcVY3tzKjihAH-RyLPK0KMp",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA2GU84Lf2d9r8359l1OQhWMT5HF6dxt3GCEOPsdFpewV9WTd5dQ9Y6nGe5apvkaTaT90rS2jEcnSL73ERparALRvA3LGMdXeYOfRJ8VUfW7HxCPHgFrGxAiStcjnrRyT_NQOH5di04gH02aoi5rbSU8sBFHBep8tkNVUJhKM8g1mHh1wQiH4dV_1yb5rsiH9iyPsFJIKCJ9W_hylQbr4Slzb3WRbU7yzzue_R7_vpbEPhMWh1oM5nnlEnNDeqdXLl9xR5FIa0JDV2L",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuADtL4CMGMMdCoZZT_Z_ThDGUpfngj2q_CI-gDSIhFIpTAAt0pMOkDQ4M1EiGqq3IorWMg8O7aNXioGmY47loQEPaeNmY61-f68PWc7Kv6sd6OrdDKvPG8r7DT22AOAvtY3N0IHNlvxT0EzQgO0zabKLKQPuhymLolfPlEFP7Evq8lSmeHeXX4xRP9lAX1ue8ae2S-gI5cXxk6_KQpXvdSKb3Hffuu2fJTS5L5SIypIGi72hc-fiXtAiNqU9fAuE8zAdn5CHP9VSTbQ",
    "/assets/asset_a6fcdbe0.png",
    "/assets/asset_6189b51a.png",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDLbLdAQscBdAuGuXFkxbfU3VhkyVzc4eycRQult9JE4H2FPNStlyavYIKLyAZlGtNMs-34V6iuttPVDa_3cvO-CWJ612X0XBWnXshDUPmk2W4pdWSWzxitsG4afRFBn59JgBhFiOQF2FpxI-aL3LBykEHMyfbkg8asQtdRdWzsfvxCWfJ5xbPEN6x6MQ_4rEtX70BGp6rSF7isNyqQUMfCKBIyx4njTX-edmeAD6Q_nZoEkSpm30jCnbp6g-4V05OigY88zCIyIOfD",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuALqVyUUL104K--y8d1gcmbQ4XZgloQRFIJCMkK27742Q1K36_UJwoYCLHYkY7B4jLUwVYNqfzhwxoDhsJBFFweipi8wOxjZQ4i4rG_TUeS7Li1QHALVOYFn7xKFDXsrl-1hfkEmxDLeKklAJHE9hTFfilrWddjIZYD8rSmFM3fkMQjgbbP4j4fKi_lbUVNXuYlh6cKhDiHQrbjYcpM5702-Xq8dp3SM7xSpyqGC58edxGSgSOx3DwxRVDQH9SfTIRqCVARshew8Biz",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTk8lyZgR5LR1uITK5zWs_LMCrB2ICi04hnjozCvKUcH-OSInlg2BmcwRAYGwtgTtn2SEEpHsWW4ehME1FWzv-KaiwhGT4bnbhPyhMjstZR-T25046c-pvzG5Jeg0U9ruykdK_kUB7gL0e-yP0rdsfZcPz6DA9366qmktTAyK4mtoUddt57a48-nAOAZzEeV3bN5vhfWua5VLWaMcy9WnWHD0fRyL_oCernmOWjbbIZzjK0wdNATByP-zwRw2FaMczsywjuzAa4Gl1",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCZKLJ14Su_vJiHmy5Jk-RVXWX7kRZWyLKRBSIaMZeW3uJOLX7rvOvdHu7RMeFVoCP322CkXNwzNtJLT4_nVoSTx_Ji8mB_LaSsNS8QRKMKw02xhTF7PuTx-ZIHuYuXno1GyDsuQ4A8mQywfob1RtXQwdgcrTyBSeLHs_ngdDKxYlyGnanvWa1qywKH4HsAZSICytGRfITA17S3a5C6xvrQsLT9_jvUg-gUZriCTZNCNHNMzvlB1fJ1V0JRAk0S859uhHBANY15G8OI"
  ];

  return (
    <>
      <section className="py-24 text-center px-margin-mobile bg-surface-container-low">
        <span className="font-label-caps text-label-caps text-primary mb-6 block tracking-[0.3em] uppercase">VISUAL JOURNEY</span>
        <h1 className="font-display-lg text-display-lg mb-4 text-on-surface md:block hidden">Gallery of Delights</h1>
        <h1 className="font-display-lg-mobile text-display-lg-mobile mb-4 text-on-surface md:hidden">Gallery of Delights</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Explore our culinary masterpieces and the premium ambiance of Bhubaneswar Kitchen n Cafe.
        </p>
      </section>

      <section className="py-16 md:py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="masonry">
          {images.map((src, idx) => (
            <div key={idx} className="masonry-item group relative overflow-hidden rounded-xl bg-surface-container-high transition-all duration-500 hover:-translate-y-2">
              <img
                className="w-full h-auto object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                alt={`Gallery image ${idx + 1}`}
                src={src}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
