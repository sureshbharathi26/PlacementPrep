import React from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLightbulb, FaLaptopCode, FaUserTie, FaChartLine, FaHandshake, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-us-page">
        {/* Hero Section */}
        <section className="hero-section d-flex align-items-center">
          <div className="container text-center text-white">
            <h1 className="display-3 fw-bold mb-4">About PlacementPrep</h1>
            <p className="lead fs-4 mb-5">
              Empowering the next generation of professionals with comprehensive career preparation
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary btn-lg px-4">Explore Resources</button>
              <button className="btn btn-outline-light btn-lg px-4">Contact Us</button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-5 bg-light">
          <div className="container py-5">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className="fw-bold mb-4 display-5">Our Mission</h2>
                <p className="lead mb-4">
                  At <span className="text-primary fw-bold">PlacementPrep</span>, we're committed to bridging the gap between academic learning and industry requirements.
                </p>
                <p>
                  We provide students with the tools, resources, and guidance needed to excel in technical interviews and secure positions at top companies worldwide. Our platform combines cutting-edge technology with expert-curated content to deliver a comprehensive preparation experience.
                </p>
                <div className="d-flex mt-4">
                  <div className="pe-4 border-end">
                    <h3 className="text-primary fw-bold">10K+</h3>
                    <p className="text-muted">Students Helped</p>
                  </div>
                  <div className="px-4 border-end">
                    <h3 className="text-primary fw-bold">200+</h3>
                    <p className="text-muted">Companies Covered</p>
                  </div>
                  <div className="ps-4">
                    <h3 className="text-primary fw-bold">95%</h3>
                    <p className="text-muted">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Team working together"
                  className="img-fluid rounded shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-5">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-5 mb-3">Our Core Values</h2>
              <p className="lead text-muted mx-auto" style={{maxWidth: '700px'}}>
                The principles that guide everything we do at PlacementPrep
              </p>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="card-body text-center">
                    <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-4 mx-auto">
                      <FaLightbulb size={30} />
                    </div>
                    <h4 className="fw-bold mb-3">Innovation</h4>
                    <p className="text-muted">
                      We constantly evolve our platform to incorporate the latest interview trends and technologies.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="card-body text-center">
                    <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-4 mx-auto">
                      <FaUserTie size={30} />
                    </div>
                    <h4 className="fw-bold mb-3">Excellence</h4>
                    <p className="text-muted">
                      We maintain the highest standards in our content quality and learning methodologies.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="card-body text-center">
                    <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-4 mx-auto">
                      <FaUsers size={30} />
                    </div>
                    <h4 className="fw-bold mb-3">Student-Centric</h4>
                    <p className="text-muted">
                      Every feature and resource is designed with student success as the primary focus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5 bg-light">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-5 mb-3">Comprehensive Preparation</h2>
              <p className="lead text-muted mx-auto" style={{maxWidth: '700px'}}>
                Everything you need to ace your technical interviews in one place
              </p>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  <div className="card-body p-0">
                    <div className="feature-img" style={{height: '200px', backgroundImage: 'url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    <div className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="icon-box bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                          <FaLaptopCode size={20} />
                        </div>
                        <h4 className="fw-bold mb-0">Technical Resources</h4>
                      </div>
                      <p className="text-muted">
                        Curated coding problems, algorithm explanations, and system design concepts from beginner to advanced levels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  <div className="card-body p-0">
                    <div className="feature-img" style={{height: '200px', backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    <div className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="icon-box bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                          <FaChartLine size={20} />
                        </div>
                        <h4 className="fw-bold mb-0">Company Insights</h4>
                      </div>
                      <p className="text-muted">
                        Detailed breakdowns of interview processes, question patterns, and expectations for 200+ top companies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  <div className="card-body p-0">
                    <div className="feature-img" style={{height: '200px', backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    <div className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="icon-box bg-primary bg-opacity-10 text-primary rounded p-2 me-3">
                          <FaHandshake size={20} />
                        </div>
                        <h4 className="fw-bold mb-0">Mock Interviews</h4>
                      </div>
                      <p className="text-muted">
                        Realistic practice interviews with detailed feedback from industry professionals and hiring managers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-5">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-5 mb-3">Our Team</h2>
              <p className="lead text-muted mx-auto" style={{maxWidth: '700px'}}>
                Industry experts and educators dedicated to your success
              </p>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" className="card-img-top" alt="Team member" />
                  <div className="card-body text-center">
                    <h5 className="fw-bold mb-1">Rajesh Kumar</h5>
                    <p className="text-muted mb-3">Founder & CEO</p>
                    <p className="card-text">
                      Former Google engineer with 10+ years of experience in technical hiring and candidate evaluation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" className="card-img-top" alt="Team member" />
                  <div className="card-body text-center">
                    <h5 className="fw-bold mb-1">Priya Sharma</h5>
                    <p className="text-muted mb-3">Head of Curriculum</p>
                    <p className="card-text">
                      Education specialist with expertise in creating effective technical learning pathways.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" className="card-img-top" alt="Team member" />
                  <div className="card-body text-center">
                    <h5 className="fw-bold mb-1">Amit Patel</h5>
                    <p className="text-muted mb-3">Product Lead</p>
                    <p className="card-text">
                      Tech entrepreneur focused on building intuitive platforms that enhance learning outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-5 bg-primary text-white">
          <div className="container py-5 text-center">
            <h2 className="fw-bold display-5 mb-4">Ready to transform your career?</h2>
            <p className="lead mb-5 mx-auto" style={{maxWidth: '700px'}}>
              Join thousands of students who have successfully prepared for their dream jobs with PlacementPrep
            </p>
            <button className="btn btn-light btn-lg px-5 py-3 fw-bold">Get Started Today</button>
          </div>
        </section>
      </div>

      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
          min-height: 500px;
          padding: 80px 0;
        }
        .icon-box {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-img {
          transition: transform 0.3s ease;
        }
        .card:hover .feature-img {
          transform: scale(1.05);
        }
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px !important;
        }
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </>
  );
};

export default AboutUs;