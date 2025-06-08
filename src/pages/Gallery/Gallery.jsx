import React, { useState, useEffect, memo } from 'react';
import './Gallery.css';
import Footer from '../../components/Footer/Footer';

import blob1 from '../../assets/fixed/icons/blob1.webp';
import blob2 from '../../assets/fixed/icons/blob2.webp';
import blob3 from '../../assets/fixed/icons/blob3.webp';
import blob4 from '../../assets/fixed/icons/blob4.webp';

import kediaCover from '../../assets/fixed/kedia/kedia.webp';
import kedia1 from '../../assets/fixed/kedia/K1.webp';
import kedia2 from '../../assets/fixed/kedia/K2.webp';
import kedia3 from '../../assets/fixed/kedia/K3.webp';
import kedia4 from '../../assets/fixed/kedia/K4.webp';
import kedia5 from '../../assets/fixed/kedia/K5.webp';
import kedia6 from '../../assets/fixed/kedia/K6.webp';

import shakaweCover from '../../assets/fixed/shakawe/shakawedono.webp';
import shakawe1 from '../../assets/fixed/shakawe/S1.webp';
import shakawe2 from '../../assets/fixed/shakawe/S2.webp';

import lavenderCover from '../../assets/fixed/lavender/lavender.webp';
import lavender1 from '../../assets/fixed/lavender/L1.webp';
import lavender2 from '../../assets/fixed/lavender/L2.webp';
import lavender3 from '../../assets/fixed/lavender/L3.webp';

import covidCover from '../../assets/fixed/covid/covid.webp';
import covid1 from '../../assets/fixed/covid/C1.webp';
import covid2 from '../../assets/fixed/covid/C2.webp';
import covid3 from '../../assets/fixed/covid/C3.webp';
import covid4 from '../../assets/fixed/covid/C4.webp';

import tsogangCover from '../../assets/fixed/tsogangtrust/tsogangtrust.webp';
import tsogang1 from '../../assets/fixed/tsogangtrust/T1.webp';
import tsogang2 from '../../assets/fixed/tsogangtrust/T2.webp';
import tsogang3 from '../../assets/fixed/tsogangtrust/T3.webp';

import mochudiCover from '../../assets/fixed/mochudi/mochud.webp';
import mochudi1 from '../../assets/fixed/mochudi/M1.webp';
import mochudi2 from '../../assets/fixed/mochudi/M2.webp';
import mochudi3 from '../../assets/fixed/mochudi/M3.webp';
import mochudi4 from '../../assets/fixed/mochudi/M4.webp';
import mochudi5 from '../../assets/fixed/mochudi/M5.webp';
import mochudi6 from '../../assets/fixed/mochudi/M6.webp';

import dynamicTalentCover from '../../assets/fixed/dynamictalent/talentshow.webp';
import dynamicTalent1 from '../../assets/fixed/dynamictalent/DT1.webp';
import dynamicTalent2 from '../../assets/fixed/dynamictalent/DT2.webp';
import dynamicTalent3 from '../../assets/fixed/dynamictalent/DT3.webp';
import dynamicTalent4 from '../../assets/fixed/dynamictalent/DT4.webp';
import dynamicTalent5 from '../../assets/fixed/dynamictalent/DT5.webp';
import dynamicTalent6 from '../../assets/fixed/dynamictalent/DT6.webp';
import dynamicTalent7 from '../../assets/fixed/dynamictalent/DT7.webp';
import dynamicTalent8 from '../../assets/fixed/dynamictalent/DT8.webp';
import dynamicTalent9 from '../../assets/fixed/dynamictalent/DT9.webp';
import dynamicTalent10 from '../../assets/fixed/dynamictalent/DT10.webp';
import dynamicTalent11 from '../../assets/fixed/dynamictalent/DT11.webp';
import dynamicTalent12 from '../../assets/fixed/dynamictalent/DT12.webp';
import dynamicTalent14 from '../../assets/fixed/dynamictalent/DT14.webp';

import lephoiGardenCover from '../../assets/fixed/lephoi/garden.webp';
import lephoiGarden1 from '../../assets/fixed/lephoi/LG1.webp';
import lephoiGarden2 from '../../assets/fixed/lephoi/LG2.webp';
import lephoiGarden3 from '../../assets/fixed/lephoi/LG3.webp';
import lephoiGarden4 from '../../assets/fixed/lephoi/LG4.webp';
import lephoiGarden5 from '../../assets/fixed/lephoi/LG5.webp';
import lephoiGarden6 from '../../assets/fixed/lephoi/LG6.webp';
import lephoiGarden7 from '../../assets/fixed/lephoi/LG7.webp';

import newspaperCover from '../../assets/fixed/newspaper/NP1.webp';
import newspaper2 from '../../assets/fixed/newspaper/NP2.webp';
import newspaper3 from '../../assets/fixed/newspaper/NP3.webp';
import newspaper4 from '../../assets/fixed/newspaper/NP4.webp';
import newspaper5 from '../../assets/fixed/newspaper/NP5.webp';

import firstEventCover from '../../assets/fixed/firstevent/FE1.webp';
import firstEvent2 from '../../assets/fixed/firstevent/FE2.webp';
import firstEvent3 from '../../assets/fixed/firstevent/FE3.webp';
import firstEvent4 from '../../assets/fixed/firstevent/FE4.webp';

import ind1 from '../../assets/fixed/IND1.webp';

import cheshirefoundationCover from '../../assets/fixed/chesirefoundation/chescover.webp';
import cheshirefoundation1 from '../../assets/fixed/chesirefoundation/ches1.webp';
import cheshirefoundation2 from '../../assets/fixed/chesirefoundation/ches2.webp';
import cheshirefoundation3 from '../../assets/fixed/chesirefoundation/ches3.webp';

import tlokwengCover from '../../assets/fixed/tlokwengfamily/tlok2.webp';
import tlokweng1 from '../../assets/fixed/tlokwengfamily/tlok1.webp';
import tlokweng2 from '../../assets/fixed/tlokwengfamily/tlok3.webp';

const blobImages = [
  blob1,
  blob3,
  blob4,
  blob2,
];

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
      coverImage: kediaCover,
      description: 'A heartfelt initiative to provide essential resources and support to Kedia Primary School.',
      date: 'July 6, 2024',
      images: [
        { id: 1, url: kediaCover, caption: 'Setting the stage: Organizing shoes and supplies for distribution.'},
        { id: 2, url: kedia1, caption: 'A display of hope: New shoes lined up for eager young feet.'},
        { id: 3, url: kedia2, caption: 'Smiles of gratitude: A moment shared with the students and volunteers.'},
        { id: 4, url: kedia3, caption: 'Joy in unity: Students celebrating the generous donations.'},
        { id: 5, url: kedia4, caption: 'Grateful hearts: Capturing the spirit of the event with a selfie.'},
        { id: 6, url: kedia5, caption: 'Sharing knowledge: A group of volunteers engaging with the community.'},
        { id: 7, url: kedia6, caption: 'Bundles of care: Essential supplies ready for distribution to those in need.'}
      ]
    },
    {
      id: 2,
      title: 'Shakawe JSS Donation',
      coverImage: shakaweCover,
      description: 'A generous contribution aimed at enhancing the learning environment for students at Shakawe Junior Secondary School.',
      date: 'April 29, 2021',
      images: [
        { id: 1, url: shakaweCover, caption: 'Collaborative efforts: Volunteers working together to organize donations for Shakawe JSS.'},
        { id: 2, url: shakawe1, caption: 'Prepared with care: A set of new uniforms ready to bring smiles to students in need.'},
        { id: 3, url: shakawe2, caption: 'Making a difference: Reception of donation boxes from Able Hearts.'}      
      ]
    },
    {
      id: 3,
      title: 'Lavender High Tea',
      coverImage: lavenderCover,
      description: 'A delightful gathering to raise funds and awareness for community development projects.',
      date: 'August 9, 2020',
      images: [
        { id: 1, url: lavenderCover, caption: 'Elegance and purpose: Guests enjoy the Lavender High Tea in their stunning attire.'},
        { id: 2, url: lavender1, caption: 'Moments of connection: Sharing laughter and inspiration at the Lavender High Tea.'},
        { id: 3, url: lavender2, caption: 'Words of empowerment: A speaker addressing attendees about community impact.'},
        { id: 4, url: lavender3, caption: 'A picture-perfect day: The vibrant Lavender High Tea setup, blending charm and philanthropy'}      
      ]
    },
    {
      id: 4,
      title: 'Covid-19 Community Relief Packages',
      coverImage: covidCover,
      description: 'A dedicated effort to distribute essential supplies to communities affected by the pandemic.',
      date: '2020',
      images: [
        { id: 1, url: covidCover, caption: 'A heartwarming moment: Able Hearts Foundation spreading hope with COVID relief packages to the elderly, blending compassion and community support.'},
        { id: 2, url: covid1, caption: 'A closer look: The thoughtful contents of an Able Hearts COVID relief package, filled with essentials to brighten the lives of the elderly.'},
        { id: 3, url: covid2, caption: 'A closer look: The thoughtful contents of an Able Hearts COVID relief package, filled with essentials to brighten the lives of the elderly.'},
        { id: 4, url: covid3, caption: 'A moment of unity: The Able Hearts team with Honourable Member of Parliament, Mr. Ignatius Moswaane, working together to support our community.'},
        { id: 5, url: covid4, caption: 'A heartwarming moment: Able Hearts Foundation spreading hope with COVID relief packages to the elderly, blending compassion and community support.'}
      ]
    },
    {
      id: 5,
      title: 'Tsogang Trust',
      coverImage: tsogangCover,
      description: 'Collaboration with Tsogang Trust to empower local communities through education and skill development.',
      date: 'October 27, 2022',
      images: [
        { id: 1, url: tsogangCover, caption: 'A generous gesture: Senn Foods providing essential foodstuffs and supplies to Tsogang Trust, fueling hope and community support.'},
        { id: 2, url: tsogang1, caption: 'Our Selfless Leader: Ms. Sakshi Bhargava, our visionary founder, leading with compassion and dedication.'},      
        { id: 3, url: tsogang2, caption: 'A heartwarming connection: Ms. Sakshi Bhargava with one of the bright young minds at Tsogang Trust, inspiring the next generation with care and compassion.'},
        { id: 4, url: tsogang3, caption: 'A generous gesture: Senn Foods providing essential foodstuffs and supplies to Tsogang Trust, fueling hope and community support.'}
      ]
    },
    {
      id: 6,
      title: 'Mochudi Resource Center',
      coverImage: mochudiCover,
      description: 'An initiative to equip the Mochudi Resource Center with vital resources to foster community engagement.',
      date: 'April 22, 2021',
      images: [
        { id: 1, url: mochudiCover, caption: 'A moment of impact: The Able Hearts team delivering essential supplies to the Mochudi Resource Center, strengthening support for the community.'},
        { id: 2, url: mochudi1, caption: 'A touch of kindness: Ms. Sakshi Bhargava sharing a special moment with the little ones, spreading love and encouragement at Tsogang Trust.'},
        { id: 3, url: mochudi2, caption: 'On the ground: The Able Hearts team sorting packages on-site at Mochudi Resource Center, ensuring every child receives the support they need.'},
        { id: 4, url: mochudi3, caption: 'A moment of impact: The Able Hearts team delivering essential supplies to the Mochudi Resource Center, strengthening support for the community.'},
        { id: 5, url: mochudi4, caption: 'A closer look: The thoughtful contents of an Able Hearts Mochudi Resource Center package, filled with essentials to brighten the lives of the Children.'},
        { id: 6, url: mochudi5, caption: 'Sharing knowledge: The crew engaging with the Children through fun and learning.'},
        { id: 7, url: mochudi6, caption: 'A moment of giving: The Able Hearts team proudly presenting the carefully prepared packages, bringing hope and support to those in need.'}
      ]
    },
    {
      id: 7,
      title: 'Dynamic Talent Show',
      coverImage: dynamicTalentCover,
      description: 'A showcase of vibrant talents aimed at celebrating creativity and diversity.',
      date: 'August 20, 2023',
      images: [
        { id: 1, url: dynamicTalentCover, caption: ''},
        { id: 2, url: dynamicTalent1, caption: ''},
        { id: 3, url: dynamicTalent2, caption: ''},
        { id: 4, url: dynamicTalent3, caption: ''},
        { id: 5, url: dynamicTalent4, caption: ''},
        { id: 6, url: dynamicTalent5, caption: ''},
        { id: 7, url: dynamicTalent6, caption: ''},
        { id: 8, url: dynamicTalent7, caption: ''},
        { id: 9, url: dynamicTalent8, caption: ''},
        { id: 10, url: dynamicTalent9, caption: ''},
        { id: 11, url: dynamicTalent10, caption: ''},
        { id: 12, url: dynamicTalent11, caption: ''},
        { id: 13, url: dynamicTalent12, caption: ''},
        { id: 15, url: dynamicTalent14, caption: ''}
      ]
    },
    {
      id: 8,
      title: 'Lephoi Able Hearts Garden and Fun Day',
      coverImage: lephoiGardenCover,
      description: 'A fun-filled day celebrating community spirit and sustainable gardening initiatives.',
      date: 'August 15, 2020',
      images: [
        { id: 1, url: lephoiGardenCover, caption: 'Able Hearts Garden Grand Opening: The Grand Opening!'},
        { id: 2, url: lephoiGarden1, caption: 'Our Selfless Leader: Ms. Sakshi Bhargava, our visionary founder, leading with compassion and dedication.'},
        { id: 3, url: lephoiGarden2, caption: 'Creative Moments: The kids had an amazing time unleashing their creativity and making beautiful beads during the fun day!'},
        { id: 4, url: lephoiGarden3, caption: 'Creative Moments: The kids had an amazing time unleashing their creativity and making beautiful beads during the fun day!'},
        { id: 5, url: lephoiGarden4, caption: 'Leading with Love: Our founder, Ms. Sakshi Bhargava, guiding the kids as they create their beautiful beadwork—turning moments into memories.'},
        { id: 6, url: lephoiGarden5, caption: 'Spreading love and hope: Able Hearts at the Lephoi Centre, delivering essential donations to those in need.'},
        { id: 7, url: lephoiGarden6, caption: 'Together for a cause: The Able Hearts crew, united in service and compassion.'},
        { id: 8, url: lephoiGarden7, caption: 'UCCSA Lephoi Centre: For Learners with Visual Impairment'}
      ]
    },
    {
      id: 9,
      title: 'News Articles',
      coverImage: newspaperCover,
      description: 'A collection of impactful news articles highlighting community achievements and milestones.',
      date: '',
      images: [
        { id: 1, url: newspaperCover, caption: 'Celebrating Milestones: Huge thanks to our media supporters for featuring the Able Hearts garden handover—your coverage helps us inspire more change!'},
        { id: 2, url: newspaper2, caption: 'A Musical Moment: Special appreciation to Kgosi Moagi for performing a beautiful song during the Able Hearts garden handover ceremony at the Lephoi Centre. Your talent added so much meaning to the day!'},
        { id: 3, url: newspaper3, caption: 'Grateful for the Spotlight: A heartfelt thank you to The Voice Newspaper Botswana and @themonitor for sharing our story and amplifying our mission!'},
        { id: 4, url: newspaper4, caption: 'Making Waves: Thank you to The Voice Newspaper Botswana and @themonitor for showcasing our journey of giving back and supporting vulnerable communities. Together, we make a difference!'},
        { id: 4, url: newspaper5, caption: 'Amplifying Impact: Thank you @therealyaronafm for giving us a platform to share our mission and reach the hearts of so many. Your support helps us make a greater difference in the lives of vulnerable communities!'}
      ]
    },
    {
      id: 10,
      title: 'First Ever Event',
      coverImage: firstEventCover,
      description: 'The landmark event that marked the beginning of our journey in making a difference.',
      date: 'August 25, 2017',
      images: [
        { id: 1, url: firstEventCover, caption: 'A Moment of Unity: Students gather to celebrate the first Able Hearts event, fostering inclusion and hope.'},
        { id: 2, url: firstEvent2, caption: 'Spreading Smiles: Engaging with the youth through fun and learning.'},
        { id: 3, url: firstEvent3, caption: 'Empowering Through Giving: Distributing clothes, books, and toys to ensure brighter tomorrows for the children.'},
        { id: 4, url: firstEvent4, caption: 'Bridging Gaps: Smiles abound as donations of school shoes bring joy and opportunity.'}
      ]
    },
    {
      id: 11,
      title: 'Cheshire Foundation',
      coverImage: cheshirefoundationCover,
      description: 'A collaboration with Cheshire Foundation to provide essential resources to vulnerable communities by the BIUST branch.',
      date: 'May 15, 2025',
      images: [
        { id: 1, url: cheshirefoundationCover, caption: 'Members of Ablehearts BIUST branch and staff from the Cheshire Foundation.'},
        { id: 2, url: cheshirefoundation1, caption: 'Ablehearts BIUST branch delivering food and clothing donations to the Cheshire Foundation.'},
        { id: 3, url: cheshirefoundation2, caption: 'The Cheshire Foundation of Botswana, Palapye Regional Office, recipient of the donations.'},
        { id: 4, url: cheshirefoundation3, caption: 'Ablehearts BIUST members with a Cheshire Foundation vehicle during their donation visit.'}
      ]
    },
    {
      id: 12,
      title: 'Tlokweng Family Visit',
      coverImage: tlokwengCover,
      description: 'AbleHearts UB branch travelled to Tlokweng, Botswana to provide essential resources to a chosen family.',
      date: 'May 8, 2025',
      images: [
        { id: 1, url: tlokwengCover, caption: 'Ablehearts UB delivering food and clothing donations to a family in Tlokweng, Botswana.'},
        { id: 2, url: tlokweng1, caption: 'Ablehearts UB members spreading love during their donation drive in Tlokweng.'},
        { id: 3, url: tlokweng2, caption: 'Members of the Ablehearts UB branch during their community outreach in Tlokweng.'}
      ]
    }
  ].sort((a, b) => {
    // Handle cases where date might be an empty string
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1; // Empty date goes to the end
    if (!b.date) return -1; // Empty date goes to the end

    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Latest date first
  });

  const handleEventClick = React.useCallback((event) => {
    setSelectedEvent(event);
    setSelectedImage(null);
  }, []);

  const handleImageClick = React.useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const closeEventModal = React.useCallback(() => setSelectedEvent(null), []);
  const closeImageModal = React.useCallback(() => setSelectedImage(null), []);
  
  const FixedImage = memo(({ src, alt, className, onClick }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      loading="lazy"
    />
  ));
  FixedImage.displayName = 'FixedImage';

  return (
    <div className={`container-gallery ${isLoaded ? 'content-loaded' : ''}`}>
      {/* Blobs section - kept intact */}
      <div className="background-blobs">
        {blobImages.map((blob, index) => (
          <FixedImage
            key={index}
            src={blob}
            alt={`Decorative blob ${index + 1}`}
            className={`blobg blob-${index + 1}`}
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
              <FixedImage
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
                  <FixedImage
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
            <FixedImage
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="indmodal-image-gallery"
              loading="lazy"
            />
            <p className="modal-image-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Gallery);