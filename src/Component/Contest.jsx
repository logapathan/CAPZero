import React, { useState, useEffect } from 'react';
import "./Style.css"
const data = {
  id: "cad-123",
  title: "Advanced Mechanical Component Design Challenge",
  type: "Race Against Time",
  status: "Upcoming",
  difficulty: "Intermediate",
  hostInfo: {
      name: "Autodesk & Engineering Solutions Ltd.",
      logo: "company-logo.png",
      followStatus: false,
      totalContests: 15,
      activeContests: 3
  },
  details: {
      startDate: "2025-01-15",
      startTime: "10:00 AM GMT",
      duration: "4 Hours",
      format: "Individual",
      access: "Public",
      maxParticipants: 500,
      currentParticipants: 142,
      registrationDeadline: "2025-01-14",
      softwareRequired: "AutoCAD 2024",
      minimumSpecs: "8GB RAM, 4GB Graphics",
      description: "This race-against-time challenge tests your ability to quickly and accurately design mechanical components under pressure. Participants will need to demonstrate their expertise in mechanical design while working efficiently under time constraints.",
      prizes: {
          first: { points: 1000, badge: "Gold Designer" },
          second: { points: 750, badge: "Silver Designer" },
          third: { points: 500, badge: "Bronze Designer" }
      },
      rules: [
          "All designs must be original work",
          "Time extensions will not be granted",
          "Multiple submissions are not allowed",
          "Designs must meet specified requirements"
      ]
  },
  timeline: [
      { id: 1, label: "Registration Opens", date: "2025-01-01", status: "completed" },
      { id: 2, label: "Registration Closes", date: "2025-01-14", status: "upcoming" },
      { id: 3, label: "Contest Start", date: "2025-01-15", status: "upcoming" },
      { id: 4, label: "Contest End", date: "2025-01-15", status: "upcoming" },
      { id: 5, label: "Results", date: "2025-01-16", status: "upcoming" }
  ],
  requirements: [
      { id: 1, text: "AutoCAD 2024 installed", icon: "fa-desktop", details: "Latest version required" },
      { id: 2, text: "Stable internet connection", icon: "fa-wifi", details: "Minimum 5 Mbps" },
      { id: 3, text: "Minimum 8GB RAM", icon: "fa-memory", details: "16GB Recommended" },
      { id: 4, text: "Basic CAD knowledge", icon: "fa-brain", details: "2+ years experience recommended" }
  ]
};

const ContestDetails = () => {
  document.title = "Register"
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    
}



  return (
    <div className="container">
      <div className="header">
        <div className="badge-container">
          <span className="badge badge-primary">
            <i className="fas fa-stopwatch"></i>
            {data.type}
          </span>
          <span className="badge badge-success">
            <i className="fas fa-circle"></i>
            {data.status}
          </span>
          <span className="badge badge-warning">
            <i className="fas fa-star"></i>
            {data.difficulty}
          </span>
        </div>

        <h1 className="contest-title">{data.title}</h1>

        <div className="host-section">
          <div className="host-logo">
            <i className="fas fa-building fa-2x"></i>
          </div>
          <div className="host-info">
            <p>Hosted by</p>
            <h3 className="host-name">{data.hostInfo.name}</h3>
            <p>
              <i className="fas fa-trophy"></i> {data.hostInfo.totalContests} contests hosted •{' '}
              {data.hostInfo.activeContests} active
            </p>
          </div>
          <button className="follow-btn" id="followHostBtn">
            <i className="fas fa-plus"></i>
            Follow Host
          </button>
        </div>
      </div>
      
      <div className="content-grid">
        <div className="info-card">
          <div className="card-header">
            <i className="fas fa-info-circle fa-lg"></i>
            <h2>Contest Details</h2>
          </div>
          <div className="info-list">
            {[
              { label: 'Start Date', value: formatDate(data.details.startDate) },
              { label: 'Start Time', value: data.details.startTime },
              { label: 'Duration', value: data.details.duration },
              { label: 'Format', value: data.details.format },
              { label: 'Access', value: data.details.access },
            ].map((item, idx) => (
              <div className="info-item" key={idx}>
                <span className="item-label">{item.label}</span>
                <span className="item-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card">
          <div className="card-header">
            <i className="fas fa-users fa-lg"></i>
            <h2>Participation</h2>
          </div>
          <div className="info-list">
            {[
              { label: 'Registered', value: `${data.details.currentParticipants} / ${data.details.maxParticipants}` },
              { label: 'Registration Closes', value: formatDate(data.details.registrationDeadline) },
              { label: 'Software Required', value: data.details.softwareRequired },
              { label: 'System Requirements', value: data.details.minimumSpecs },
            ].map((item, idx) => (
              <div className="info-item" key={idx}>
                <span className="item-label">{item.label}</span>
                <span className="item-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card">
          <div className="card-header">
            <i className="fas fa-trophy fa-lg"></i>
            <h2>Prizes</h2>
          </div>
          <div className="prize-grid">
            {Object.entries(data.details.prizes).map(([position, prize]) => (
              <div className="prize-card" key={position}>
                <div className="prize-position">
                  {position.charAt(0).toUpperCase() + position.slice(1)} Place
                </div>
                <div className="prize-points">{prize.points} Points</div>
                <div>{prize.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="timeline">
        <h2>Contest Timeline</h2>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {data.timeline.map((point) => (
            <div className="timeline-point" key={point.id}>
              <div
                className={`point-marker ${point.status}`}
                title={point.label}
              >
                 <i
                  className={`fas ${
                    point.status === 'completed'
                      ? 'fa-check'
                      : point.id === 1
                      ? 'fa-flag-checkered'
                      : point.id === data.timeline.length
                      ? 'fa-trophy'
                      : 'fa-clock'
                  }`}></i>
              </div>
              <div className="point-info">
                <div className="point-label">{point.label}</div>
                <div className="point-date">{formatDate(point.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="description">
        <h2>Contest Description</h2>
        <p>{data.details.description}</p>

        <div className="requirements">
          <h3>Requirements</h3>
          <div className="req-grid">
            {data.requirements.map((req, idx) => (
              <div className="req-item" key={idx}>
                <div className="req-icon">
                  <i className={`fas ${req.icon}`}></i>
                </div>
                <div>
                  <div className="req-text">{req.text}</div>
                  <small className="req-details">{req.details}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" id="registerBtn">
          <i className="fas fa-user-plus"></i>
          Register Now
        </button>
        <button className="btn btn-secondary" id="calendarBtn " onClick={() => alert("hi")}>
          <i className="far fa-calendar-plus"></i>
          Add to Calendar
        
        </button>
      </div>
    </div>
  );
};

export default ContestDetails;
