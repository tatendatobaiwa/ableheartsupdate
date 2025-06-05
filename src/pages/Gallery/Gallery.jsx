import React, { useState, useEffect, memo } from 'react';
import './Gallery.css';

const blobImages = [
  '/assets/fixed/icons/blob1.webp',
  '/assets/fixed/icons/blob3.webp',
  '/assets/fixed/icons/blob4.webp',
  '/assets/fixed/icons/blob2.webp',
];

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after initial render
    setIsLoaded(true);
    
    // fixed scroll handler with debounce
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 300);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
    };
  }, []);


  // Event data structure with sub-images
  const events = [
    {
      id: 1,
      title: 'Kedia Primary Donation',
      coverImage: '/assets/fixed/kedia/kedia.webp',
      description: 'A heartfelt initiative to provide essential resources and support to Kedia Primary School.',
      date: 'July 6, 2024',
      images: [{ id: 1, url: '/assets/fixed/kedia/kedia.webp', caption: 'Setting the stage: Organizing shoes and supplies for distribution.'},
      { id: 2, url: '/assets/fixed/kedia/K1.webp', caption: 'A display of hope: New shoes lined up for eager young feet.'},      
      { id: 3, url: '/assets/fixed/kedia/K2.webp', caption: 'Smiles of gratitude: A moment shared with the students and volunteers.'},
      { id: 4, url: '/assets/fixed/kedia/K3.webp', caption: 'Joy in unity: Students celebrating the generous donations.'},
      { id: 5, url: '/assets/fixed/kedia/K4.webp', caption: 'Grateful hearts: Capturing the spirit of the event with a selfie.'},
      { id: 6, url: '/assets/fixed/kedia/K5.webp', caption: 'Sharing knowledge: A group of volunteers engaging with the community.'},
      { id: 7, url: '/assets/fixed/kedia/K6.webp', caption: 'Bundles of care: Essential supplies ready for distribution to those in need.'}
        ]
    },
    {
      id: 2,
      title: 'Shakawe JSS Donation',
      coverImage: '/assets/fixed/shakawe/shakawedono.webp',
      description: 'A generous contribution aimed at enhancing the learning environment for students at Shakawe Junior Secondary School.',
      date: 'April 29, 2021',
      images: [{ id: 1, url: '/assets/fixed/shakawe/shakawedono.webp', caption: 'Collaborative efforts: Volunteers working together to organize donations for Shakawe JSS.'},
      { id: 2, url: '/assets/fixed/shakawe/S1.webp', caption: 'Prepared with care: A set of new uniforms ready to bring smiles to students in need.'},
      { id: 3, url: '/assets/fixed/shakawe/S2.webp', caption: 'Making a difference: Reception of donation boxes from Able Hearts.'}      
    ]
    },
    {
      id: 3,
      title: 'Lavender High Tea',
      coverImage: '/assets/fixed/lavender/lavender.webp',
      description: 'A delightful gathering to raise funds and awareness for community development projects.',
      date: 'August 9, 2020',
      images: [{ id: 1, url: '/assets/fixed/lavender/lavender.webp', caption: 'Elegance and purpose: Guests enjoy the Lavender High Tea in their stunning attire.'},
      { id: 2, url: '/assets/fixed/lavender/L1.webp', caption: 'Moments of connection: Sharing laughter and inspiration at the Lavender High Tea.'},
      { id: 3, url: '/assets/fixed/lavender/L2.webp', caption: 'Words of empowerment: A speaker addressing attendees about community impact.'},
      { id: 4, url: '/assets/fixed/lavender/L3.webp', caption: 'A picture-perfect day: The vibrant Lavender High Tea setup, blending charm and philanthropy'}      
    ]
    },
    {
      id: 4,
      title: 'Covid-19 Community Relief Packages',
      coverImage: '/assets/fixed/covid/covid.webp',
      description: 'A dedicated effort to distribute essential supplies to communities affected by the pandemic.',
      date: '2020',
      images: [{ id: 1, url: '/assets/fixed/covid/covid.webp', caption: 'A heartwarming moment: Able Hearts Foundation spreading hope with COVID relief packages to the elderly, blending compassion and community support.'},
      { id: 2, url: '/assets/fixed/covid/C1.webp', caption: 'A closer look: The thoughtful contents of an Able Hearts COVID relief package, filled with essentials to brighten the lives of the elderly.'},
      { id: 3, url: '/assets/fixed/covid/C2.webp', caption: 'A closer look: The thoughtful contents of an Able Hearts COVID relief package, filled with essentials to brighten the lives of the elderly.'},
      { id: 4, url: '/assets/fixed/covid/C3.webp', caption: 'A moment of unity: The Able Hearts team with Honourable Member of Parliament, Mr. Ignatius Moswaane, working together to support our community.'},
      { id: 5, url: '/assets/fixed/covid/C4.webp', caption: 'A heartwarming moment: Able Hearts Foundation spreading hope with COVID relief packages to the elderly, blending compassion and community support.'}

      ]
    },
    {
      id: 5,
      title: 'Tsogang Trust',
      coverImage: '/assets/fixed/tsogangtrust/tsogangtrust.webp',
      description: 'Collaboration with Tsogang Trust to empower local communities through education and skill development.',
      date: 'October 27, 2022',
      images: [{ id: 1, url: '/assets/fixed/tsogangtrust/tsogangtrust.webp', caption: 'A generous gesture: Senn Foods providing essential foodstuffs and supplies to Tsogang Trust, fueling hope and community support.'},
      { id: 2, url: '/assets/fixed/tsogangtrust/T1.webp', caption: 'Our Selfless Leader: Ms. Sakshi Bhargava, our visionary founder, leading with compassion and dedication.'},      
      { id: 3, url: '/assets/fixed/tsogangtrust/T2.webp', caption: 'A heartwarming connection: Ms. Sakshi Bhargava with one of the bright young minds at Tsogang Trust, inspiring the next generation with care and compassion.'},
      { id: 4, url: '/assets/fixed/tsogangtrust/T3.webp', caption: 'A generous gesture: Senn Foods providing essential foodstuffs and supplies to Tsogang Trust, fueling hope and community support.'}
    ]
    },
    {
      id: 6,
      title: 'Mochudi Resource Center',
      coverImage: '/assets/fixed/mochudi/mochud.webp',
      description: 'An initiative to equip the Mochudi Resource Center with vital resources to foster community engagement.',
      date: 'April 22, 2021',
      images: [{ id: 1, url: '/assets/fixed/mochudi/mochud.webp', caption: 'A moment of impact: The Able Hearts team delivering essential supplies to the Mochudi Resource Center, strengthening support for the community.'},
      { id: 2, url: '/assets/fixed/mochudi/M1.webp', caption: 'A touch of kindness: Ms. Sakshi Bhargava sharing a special moment with the little ones, spreading love and encouragement at Tsogang Trust.'},
      { id: 3, url: '/assets/fixed/mochudi/M2.webp', caption: 'On the ground: The Able Hearts team sorting packages on-site at Mochudi Resource Center, ensuring every child receives the support they need.'},
      { id: 4, url: '/assets/fixed/mochudi/M3.webp', caption: 'A moment of impact: The Able Hearts team delivering essential supplies to the Mochudi Resource Center, strengthening support for the community.'},
      { id: 5, url: '/assets/fixed/mochudi/M4.webp', caption: 'A closer look: The thoughtful contents of an Able Hearts Mochudi Resource Center package, filled with essentials to brighten the lives of the Children.'},
      { id: 6, url: '/assets/fixed/mochudi/M5.webp', caption: 'Sharing knowledge: The crew engaging with the Children through fun and learning.'},
      { id: 7, url: '/assets/fixed/mochudi/M6.webp', caption: 'A moment of giving: The Able Hearts team proudly presenting the carefully prepared packages, bringing hope and support to those in need.'}
    ]
    },
    {
      id: 7,
      title: 'Dynamic Talent Show',
      coverImage: '/assets/fixed/dynamictalent/talentshow.webp',
      description: 'A showcase of vibrant talents aimed at celebrating creativity and diversity.',
      date: 'August 20, 2023',
      images: [{ id: 1, url: '/assets/fixed/dynamictalent/talentshow.webp', caption: ''},
      { id: 2, url: '/assets/fixed/dynamictalent/DT1.webp', caption: ''},
      { id: 3, url: '/assets/fixed/dynamictalent/DT2.webp', caption: ''},
      { id: 4, url: '/assets/fixed/dynamictalent/DT3.webp', caption: ''},
      { id: 5, url: '/assets/fixed/dynamictalent/DT4.webp', caption: ''},
      { id: 6, url: '/assets/fixed/dynamictalent/DT5.webp', caption: ''},
      { id: 7, url: '/assets/fixed/dynamictalent/DT6.webp', caption: ''},
      { id: 8, url: '/assets/fixed/dynamictalent/DT7.webp', caption: ''},
      { id: 9, url: '/assets/fixed/dynamictalent/DT8.webp', caption: ''},
      { id: 10, url: '/assets/fixed/dynamictalent/DT9.webp', caption: ''},
      { id: 11, url: '/assets/fixed/dynamictalent/DT10.webp', caption: ''},
      { id: 12, url: '/assets/fixed/dynamictalent/DT11.webp', caption: ''},
      { id: 13, url: '/assets/fixed/dynamictalent/DT12.webp', caption: ''},
      { id: 15, url: '/assets/fixed/dynamictalent/DT14.webp', caption: ''}
    ]
    },
    {
      id: 8,
      title: 'Lephoi Able Hearts Garden and Fun Day',
      coverImage: '/assets/fixed/lephoi/garden.webp',
      description: 'A fun-filled day celebrating community spirit and sustainable gardening initiatives.',
      date: 'August 15, 2020',
      images: [{ id: 1, url: '/assets/fixed/lephoi/garden.webp', caption: 'Able Hearts Garden Grand Opening: The Grand Opening!'},
      { id: 2, url: '/assets/fixed/lephoi/LG1.webp', caption: 'Our Selfless Leader: Ms. Sakshi Bhargava, our visionary founder, leading with compassion and dedication.'},
      { id: 3, url: '/assets/fixed/lephoi/LG2.webp', caption: 'Creative Moments: The kids had an amazing time unleashing their creativity and making beautiful beads during the fun day!'},
      { id: 4, url: '/assets/fixed/lephoi/LG3.webp', caption: 'Creative Moments: The kids had an amazing time unleashing their creativity and making beautiful beads during the fun day!'},
      { id: 5, url: '/assets/fixed/lephoi/LG4.webp', caption: 'Leading with Love: Our founder, Ms. Sakshi Bhargava, guiding the kids as they create their beautiful beadwork—turning moments into memories.'},
      { id: 6, url: '/assets/fixed/lephoi/LG5.webp', caption: 'Spreading love and hope: Able Hearts at the Lephoi Centre, delivering essential donations to those in need.'},
      { id: 7, url: '/assets/fixed/lephoi/LG6.webp', caption: 'Together for a cause: The Able Hearts crew, united in service and compassion.'},
      { id: 8, url: '/assets/fixed/lephoi/LG7.webp', caption: 'UCCSA Lephoi Centre: For Learners with Visual Impairment'}]
    },
    {
      id: 9,
      title: 'News Articles',
      coverImage: '/assets/fixed/newspaper/NP1.webp',
      description: 'A collection of impactful news articles highlighting community achievements and milestones.',
      date: '',
      images: [{ id: 1, url: '/assets/fixed/newspaper/NP1.webp', caption: 'Celebrating Milestones: Huge thanks to our media supporters for featuring the Able Hearts garden handover—your coverage helps us inspire more change!'},
      { id: 2, url: '/assets/fixed/newspaper/NP2.webp', caption: 'A Musical Moment: Special appreciation to Kgosi Moagi for performing a beautiful song during the Able Hearts garden handover ceremony at the Lephoi Centre. Your talent added so much meaning to the day!'},
      { id: 3, url: '/assets/fixed/newspaper/NP3.webp', caption: 'Grateful for the Spotlight: A heartfelt thank you to The Voice Newspaper Botswana and @themonitor for sharing our story and amplifying our mission!'},
      { id: 4, url: '/assets/fixed/newspaper/NP4.webp', caption: 'Making Waves: Thank you to The Voice Newspaper Botswana and @themonitor for showcasing our journey of giving back and supporting vulnerable communities. Together, we make a difference!'},
      { id: 4, url: '/assets/fixed/newspaper/NP5.webp', caption: 'Amplifying Impact: Thank you @therealyaronafm for giving us a platform to share our mission and reach the hearts of so many. Your support helps us make a greater difference in the lives of vulnerable communities!'}]
    },
    {
      id: 10,
      title: 'First Ever Event',
      coverImage: '/assets/fixed/firstevent/FE1.webp',
      description: 'The landmark event that marked the beginning of our journey in making a difference.',
      date: 'August 25, 2017',
      images: [{ id: 1, url: '/assets/fixed/firstevent/FE1.webp', caption: 'A Moment of Unity: Students gather to celebrate the first Able Hearts event, fostering inclusion and hope.'},
      { id: 2, url: '/assets/fixed/firstevent/FE2.webp', caption: 'Spreading Smiles: Engaging with the youth through fun and learning.'},
      { id: 3, url: '/assets/fixed/firstevent/FE3.webp', caption: 'Empowering Through Giving: Distributing clothes, books, and toys to ensure brighter tomorrows for the children.'},
      { id: 4, url: '/assets/fixed/firstevent/FE4.webp', caption: 'Bridging Gaps: Smiles abound as donations of school shoes bring joy and opportunity.'}]
    }
  ];

  const individualMedia = [
    {
      id: 1,
      type: 'image',
      url: '/assets/fixed/IND1.webp',
      caption: 'Certificate of Appreciation from Lephoi Centre for the Blind.',
      date: 'December 21, 2020',
    },
    {
      id: 2,
      type: 'video',
      url: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Fableheartsfoundation%2Fvideos%2F1023655192465414%2F&show_text=false&width=267&t=0',
      caption: 'Kedia Primary School Visit.',
      date: 'July 6, 2024',
    },
    {
      id: 3,
      type: 'video',
      url: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2Fableheartsfoundation%2Fvideos%2F627034052479114%2F&show_text=false&width=560&t=0',
      caption: 'Donations Handover for Tsogang Trust.',
      date: 'October 27, 2022',
    },
    {
      id: 4,
      type: 'video',
      url: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2Fableheartsfoundation%2Fvideos%2F929323177971101%2F&show_text=false&width=560&t=0',
      caption: 'Mochudi Resource Center Visit.',
      date: 'December 7, 2021',
    }
  ];

  const handleEventClick = React.useCallback((event) => {
    setSelectedEvent(event);
    setSelectedImage(null);
    setSelectedMedia(null);
  }, []);

  const handleImageClick = React.useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleMediaClick = React.useCallback((media) => {
    setSelectedMedia(media);
    setSelectedEvent(null);
    setSelectedImage(null);
  }, []);

  const closeEventModal = React.useCallback(() => setSelectedEvent(null), []);
  const closeImageModal = React.useCallback(() => setSelectedImage(null), []);
  const closeMediaModal = React.useCallback(() => setSelectedMedia(null), []);
  
  const fixedImage = memo(({ src, alt, className, onClick }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      loading="lazy"
    />
  ));

  return (
    <div className={`container-gallery ${isLoaded ? 'content-loaded' : ''}`}>
      {/* Blobs section - kept intact */}
      <div className="background-blobs-gallery">
        {blobImages.map((blob, index) => (
          <fixedImage
            key={index}
            src={blob}
            alt={`Decorative blob ${index + 1}`}
            className={`blobs-gallery blobs-gallery-${index + 1}`}
          />
        ))}
      </div>

      <div className={`header-gallery pre-animate-gallery ${isLoaded ? 'fade-in-gallery' : ''}`}>
        <h1 className="title-gallery">Event Gallery</h1>
        <p className="subtitle-gallery">
          Explore our events and the moments that make them special.
        </p>
      </div>

      <div className={`main-gallery pre-animate-gallery ${isLoaded ? 'fade-in-gallery' : ''}`}>
        <div className="events-grid">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => handleEventClick(event)}
            >
              <fixedImage
                src={event.coverImage}
                alt={event.title}
                className="event-cover-image"
              />
              <div className="event-card-overlay">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Individual Media</h2>
        <div className="individual-media-grid">
          {individualMedia.map((media) => (
            <div
              key={media.id}
              className="media-card"
              onClick={() => handleMediaClick(media)}
            >
              {media.type === "image" ? (
                <fixedImage
                  src={media.url}
                  alt={media.caption}
                  className="media-image"
                  loading="lazy"
                />
              ) : (
                <iframe
                  src={media.url}
                  title={`Media ${media.id}`}
                  className="media-video"
                  loading="lazy"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
              <div className="media-card-overlay">
                <p className="media-caption">{media.caption}</p>
                <p className="media-date">{media.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals - kept intact but with fixed image rendering */}
      {selectedEvent && (
        <div className="modal-overlay-gallery" onClick={closeEventModal}>
          <div
            className="modal-content-gallery event-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button-gallery" onClick={closeEventModal}>
              &times;
            </button>
            <div className="event-modal-header">
              <h2 className="event-modal-title">{selectedEvent.title}</h2>
              <p className="event-modal-date">{selectedEvent.date}</p>
              <p className="event-modal-description">{selectedEvent.description}</p>
            </div>

            <div className="event-images-grid">
              {selectedEvent.images.map((image) => (
                <div
                  key={image.id}
                  className="event-image-card"
                  onClick={() => handleImageClick(image)}
                >
                  <fixedImage
                    src={image.url}
                    alt={image.caption}
                    className="event-image"
                    loading="lazy"
                  />
                  <div className="event-image-overlay">
                    <p className="event-image-caption">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="indmodal-overlay-gallery" onClick={closeImageModal}>
          <div
            className="indmodal-content-gallery image-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="indclose-button-gallery" onClick={closeImageModal}>
              &times;
            </button>
            <fixedImage
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="indmodal-image-gallery"
              loading="lazy"
            />
            <p className="modal-image-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}

      {selectedMedia && (
        <div className="modal-overlay-gallery" onClick={closeMediaModal}>
          <div
            className={`modal-content-gallery ${selectedMedia?.type === 'video' ? 'video-modal' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button-gallery" onClick={closeMediaModal}>
              &times;
            </button>
            {selectedMedia.type === "image" ? (
              <fixedImage
                src={selectedMedia.url}
                alt={selectedMedia.caption}
                className="modal-media-image"
                loading="lazy"
              />
            ) : (
              <iframe
                src={selectedMedia.url}
                title="Selected Media"
                loading="lazy"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                className="modal-media-video"
              />
            )}
            <p className="modal-media-caption">{selectedMedia.caption}</p>
          </div>
        </div>
      )}

      {isScrolled && (
        <button 
          className="scroll-to-top-btn-gallery" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default memo(Gallery);