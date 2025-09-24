import streamlit as st
import pandas as pd
from datetime import datetime
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from deep_translator import GoogleTranslator
from translations import TRANSLATIONS  # Static UI translations

# --- Gmail SMTP Config ---
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "charangottapu77@gmail.com"
SMTP_PASSWORD = "ulhupqguvoboqbwk"

# Supported languages
LANGUAGES = list(TRANSLATIONS.keys())

# Initialize default language
if 'target_language' not in st.session_state:
    st.session_state['target_language'] = 'English'

# ---------------- Translation Functions ----------------
def translate(text):
    target_lang = st.session_state['target_language']
    if target_lang == 'English' or not text.strip():
        return text
    try:
        # Check in dataset first
        translated = TRANSLATIONS.get(target_lang, {}).get(text)
        if translated:  # if found in dataset
            return translated
        # else use deep-translator
        return GoogleTranslator(source='auto', target=target_lang).translate(text)
    except Exception as e:
        # (optional) log the error if needed: print(f"Translation error: {e}")
        return text

def translate_dynamic(text):
    target_lang = st.session_state['target_language']
    if target_lang == 'English' or not text.strip():
        return text
    try:
        return GoogleTranslator(source='auto', target=target_lang).translate(text)
    except:
        return text

# ---------------- Email Function ----------------
def send_application_email(to_email, applicant_name, internship_title, company_name, application_id):
    subject = f"{translate('Application Confirmation')}: {internship_title} at {company_name}"
    body = f"""
{translate('Dear')} {applicant_name},

{translate('Thank you for applying for the position of')} {internship_title} {translate('at')} {company_name}.

{translate('Your application has been received successfully.')}
{translate('Application ID')}: {application_id}
{translate('Date')}: {datetime.now().strftime('%B %d, %Y')}

{translate('We will review your application and get back to you soon.')}

{translate('Best regards')},
PM Internship Team
"""
    msg = MIMEMultipart()
    msg['From'] = SMTP_USER
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, to_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        st.error(f"{translate('Failed to send confirmation email')}: {e}")
        return False

# ---------------- Data Loading ----------------
@st.cache_data
def load_data():
    try:
        students = pd.read_csv('student_profiles_dataset.csv')
        internships = pd.read_csv('pm_internship_opportunities.csv')
        applications = pd.read_csv('student_applications.csv')
        companies = pd.read_csv('companies_dataset.csv')
        skills_master = pd.read_csv('skills_master.csv')
        return students, internships, applications, companies, skills_master
    except FileNotFoundError as e:
        st.error(f"{translate('Dataset file not found')}: {e}")
        return None, None, None, None, None

# ---------------- Recommendation Logic ----------------
def get_recommendations_pages(internships_df, student_profile):
    sector = student_profile['preferred_sector']
    location = student_profile['preferred_location']
    education = student_profile['education_level']
    skills = set([s.strip().lower() for s in student_profile['skills'].split(',')])

    # Education hierarchy
    education_hierarchy = ["High School", "Diploma", "Undergraduate"]
    if education not in education_hierarchy:
        allowed_educations = [education]
    else:
        idx = education_hierarchy.index(education)
        allowed_educations = education_hierarchy[:idx+1][::-1]

    recs = []
    for _, internship in internships_df.iterrows():
        # Strict sector, education, and location filter
        if internship['sector'] != sector:
            continue
        if internship['education_requirement'] not in allowed_educations:
            continue
        if internship['location'] != location:
            continue
        required_skills = set([s.strip().lower() for s in internship['required_skills'].split(',') if s.strip()])
        skill_overlap = len(skills.intersection(required_skills))

        # Skill filter logic
        if education == "High School":
            if required_skills and not required_skills.issubset(skills):
                continue
        else:
            if required_skills and skill_overlap == 0:
                continue

        match_score = 6 + ((skill_overlap / len(required_skills)) * 4 if len(required_skills) > 0 else 0)
        recs.append((internship, int((match_score / 10) * 100)))

    recs.sort(key=lambda x: x[1], reverse=True)
    page_size = 5
    pages = [recs[i:i + page_size] for i in range(0, len(recs), page_size)]
    return pages

# ---------------- Application Form ----------------
def show_application_form(internship):
    internship_title = internship['title']
    company_name = internship['company']
    internship_id = internship['internship_id']

    st.markdown("---")
    st.subheader(f"📝 {translate('Apply for')} {translate_dynamic(internship_title)}")
    st.markdown(f"{translate('Company')}: {translate_dynamic(company_name)}")
    st.markdown(translate("Please fill in your details to complete the application:"))

    if 'application_submitted' not in st.session_state:
        st.session_state['application_submitted'] = False

    with st.form(key=f"application_form_{internship_id}"):
        col1, col2 = st.columns(2)
        with col1:
            applicant_name = st.text_input(translate("Full Name *"), placeholder=translate("Enter your full name"))
            email = st.text_input(translate("Email Address *"), placeholder=translate("your.email@example.com"))
        with col2:
            mobile = st.text_input(translate("Mobile Number *"), placeholder="+91 XXXXXXXXXX")
            current_location = st.text_input(translate("Current Location"), placeholder=translate("City, State"))
        cover_letter = st.text_area(
            translate("Why are you interested in this internship? (Optional)"),
            placeholder=translate("Brief message about your interest..."),
            height=100
        )
        resume_file = st.file_uploader(
            translate("Upload Resume (Optional)"),
            type=['pdf', 'doc', 'docx'],
            help=translate("Upload your resume in PDF or Word format")
        )
        agree_terms = st.checkbox(
            translate("I agree to the Terms & Conditions and Privacy Policy *"), value=False
        )
        col_submit, col_cancel = st.columns([1, 1])
        with col_submit:
            submit_button = st.form_submit_button(translate(" Submit Application"), type="primary", use_container_width=True)
        with col_cancel:
            cancel_button = st.form_submit_button(translate("❌ Cancel"), use_container_width=True)

        if submit_button:
            errors = []
            if not applicant_name or len(applicant_name.strip()) < 2:
                errors.append(translate("Please enter a valid full name"))
            if not email or "@" not in email or "." not in email:
                errors.append(translate("Please enter a valid email address"))
            if not mobile or len(mobile.replace(" ", "").replace("+", "").replace("-", "")) < 10:
                errors.append(translate("Please enter a valid mobile number"))
            if not agree_terms:
                errors.append(translate("Please agree to Terms & Conditions"))
            if errors:
                for error in errors:
                    st.error(f"❌ {error}")
            else:
                with st.spinner(translate("Processing your application...")):
                    time.sleep(2)
                st.success(translate("🎉 Application Submitted Successfully!"))
                st.session_state['no_of_applications'] += 1

                application_id = f"APP{internship_id}{int(time.time())}"
                st.markdown(f"""
                <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
                                padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50; margin: 15px 0;">
                    <p><strong>👤 {translate('Name')}:</strong> {applicant_name}</p>
                    <p><strong>📧 {translate('Email')}:</strong> {email}</p>
                    <p><strong>📱 {translate('Mobile')}:</strong> {mobile}</p>
                    <p><strong>🏢 {translate('Position')}:</strong> {translate_dynamic(internship_title)}</p>
                    <p><strong>🏭 {translate('Company')}:</strong> {translate_dynamic(company_name)}</p>
                    <p><strong>📅 {translate('Application Date')}:</strong> {datetime.now().strftime('%B %d, %Y')}</p>
                    <p><strong>🆔 {translate('Application ID')}:</strong> {application_id}</p>
                </div>
                """, unsafe_allow_html=True)

                st.markdown(f"### 🚀 {translate('What\'s Next?')}")
                st.info(
                    f"{translate('📩 Confirmation Email: You\'ll receive a confirmation email shortly.')}  \n"
                    f"{translate('⏱ Review Process: Applications are typically reviewed within 5-7 business days.')}  \n"
                    f"{translate('📱 Status Updates: Check your email and phone for updates from the company.')}  \n"
                    f"{translate('🔄 Follow Up: You can follow up after 1 week if you don\'t hear back.')}")

                application_data = {
                    'name': applicant_name,
                    'email': email,
                    'mobile': mobile,
                    'internship_id': internship_id,
                    'internship_title': internship_title,
                    'company': company_name,
                    'application_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'status': 'Applied'
                }
                if 'applications' not in st.session_state:
                    st.session_state.applications = []
                st.session_state.applications.append(application_data)

                email_sent = send_application_email(email, applicant_name, internship_title, company_name, application_id)
                if email_sent:
                    st.success(translate("Confirmation email sent successfully!"))
                else:
                    st.warning(translate("Failed to send confirmation email."))

                st.balloons()
                st.session_state['application_submitted'] = True

        if cancel_button:
            st.session_state.show_application_form = False
            st.session_state.selected_internship = None
            st.session_state.application_submitted = False
            st.rerun()

    if st.session_state.get('application_submitted', False):
        if st.button(translate("Get More Recommendations")):
            st.session_state.show_application_form = False
            st.session_state.selected_internship = None
            # Cycle to next recommendations page
            if st.session_state.recommendations_pages:
                st.session_state.page_index = (st.session_state.page_index + 1) % len(st.session_state.recommendations_pages)
            else:
                st.session_state.page_index = 0
            st.rerun()

# ---------------- Dashboard ----------------
def render_dashboard(internships):
    st.subheader(translate("📊 Dashboard"))
    st.metric(translate("Total Internships"), f"{len(internships):,}")
    st.metric(translate("Available Sectors"), internships['sector'].nunique())
    st.metric(translate("Avg. Stipend"), f"₹{internships['stipend'].mean():,.0f}")
    st.metric(translate("No of Persons Applied"), f"{st.session_state.get('no_of_applications', 0):,}")

    if st.session_state.get('applications'):
        st.markdown("### ✅ " + translate("Applied Courses"))
        for app in st.session_state.applications:
            st.markdown(f"- {translate_dynamic(app['internship_title'])} ({translate_dynamic(app['company'])})")

    if st.session_state.get('saved_jobs'):
        st.markdown("### ⭐ " + translate("Saved Courses"))
        for job in st.session_state.saved_jobs:
            st.markdown(f"- {translate_dynamic(job['title'])} ({translate_dynamic(job['company'])})")

# ---------------- Main App ----------------
def main():
    st.set_page_config(page_title="PM Internship Recommendation Engine", page_icon="🎯", layout="wide")

    if 'no_of_applications' not in st.session_state:
        st.session_state['no_of_applications'] = 0
    if 'saved_jobs' not in st.session_state:
        st.session_state.saved_jobs = []
    if 'applications' not in st.session_state:
        st.session_state.applications = []

    # --- Language Selection ---
    st.sidebar.header("🌐 " + translate("Select Language"))
    st.session_state['target_language'] = st.sidebar.selectbox(
        translate("Language"), LANGUAGES, index=LANGUAGES.index(st.session_state['target_language'])
    )
    st.sidebar.markdown(f"**Current Language:** {st.session_state['target_language']}")

    st.title(translate(" PM Internship Recommendation Engine"))
    st.markdown(translate("*Find the perfect internship match based on your profile!*"))

    students, internships, applications, companies, skills_master = load_data()
    if internships is None:
        return
    st.session_state.internships = internships

    # --- Sidebar Profile ---
    st.sidebar.header("📝 " + translate("Your Profile"))
    name = st.sidebar.text_input(translate("Name"), translate("Your Name"))
    age = st.sidebar.slider(translate("Age"), 18, 30, 22)

    # --- Education Mapping ---
    EDUCATION_OPTIONS = {
        "High School": translate("High School"),
        "Diploma": translate("Diploma"),
        "Undergraduate": translate("Undergraduate")
    }
    education_choice = st.sidebar.selectbox(translate("Education Level"), list(EDUCATION_OPTIONS.values()))
    # Always store English value
    education_level = [k for k, v in EDUCATION_OPTIONS.items() if v == education_choice][0]

    cgpa = st.sidebar.slider(translate("CGPA/Percentage"), 4.0, 10.0, 7.5, 0.1)

    available_skills = skills_master['skill_name'].tolist() if skills_master is not None else [
        'Python', 'Java', 'Excel', 'Communication', 'Leadership', 'Problem Solving'
    ]
    selected_skills = st.sidebar.multiselect(
        translate("Your Skills (Select multiple)"),
        available_skills,
        default=['Communication', 'Problem Solving']
    )

    # --- Sector Mapping ---
    SECTOR_OPTIONS = {sector: translate(sector) for sector in internships['sector'].unique()}
    sector_choice = st.sidebar.selectbox(translate("Preferred Sector"), list(SECTOR_OPTIONS.values()))
    preferred_sector = [k for k, v in SECTOR_OPTIONS.items() if v == sector_choice][0]

    # --- Location Mapping ---
    LOCATION_OPTIONS = {loc: translate(loc) for loc in internships['location'].unique()}
    location_choice = st.sidebar.selectbox(translate("Preferred Location"), list(LOCATION_OPTIONS.values()))
    preferred_location = [k for k, v in LOCATION_OPTIONS.items() if v == location_choice][0]

    # --- Save Profile ---
    student_profile = {
        'name': name,
        'age': age,
        'education_level': education_level,   # ✅ English value
        'skills': ', '.join(selected_skills),
        'preferred_sector': preferred_sector, # ✅ English value
        'preferred_location': preferred_location  # ✅ English value
    }
    st.session_state.student_profile = student_profile

    # --- Main Recommendation Section ---
    col1, col2 = st.columns([2, 1])
    with col1:
        if st.button(translate("Get Personalized Recommendations"), type="primary"):
            pages = get_recommendations_pages(internships, student_profile)
            if not pages:
                st.warning(translate("No internships found matching your preferences."))
                st.session_state.recommendations_pages = []
                st.session_state.page_index = 0
            else:
                st.session_state.recommendations_pages = pages
                st.session_state.page_index = 0

        if st.session_state.get('recommendations_pages', []):
            current_page = st.session_state.recommendations_pages[st.session_state.page_index]
            batch_text = f"{translate("Showing internships batch")} {st.session_state.page_index + 1} {translate('of')} {len(st.session_state.recommendations_pages)}"
            st.success(batch_text)
            for i, (internship, match_score) in enumerate(current_page, 1):
                st.markdown(f"""
                <div style="border: 2px solid #e1f5fe; border-radius: 10px; padding: 20px; margin: 15px 0;
                                background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h3 style="color: #1976d2; margin: 0 0 10px 0;">#{i} {translate_dynamic(internship['title'])}</h3>
                            <p><strong>🏢 {translate('Company')}:</strong> {translate_dynamic(internship['company'])}</p>
                            <p><strong>🎯 {translate('Sector')}:</strong> {translate_dynamic(internship['sector'])}</p>
                            <p><strong>📍 {translate('Location')}:</strong> {translate_dynamic(internship['location'])}</p>
                            <p><strong>⏱ {translate('Duration')}:</strong> {internship['duration_months']} months</p>
                            <p><strong>💰 {translate('Stipend')}:</strong> ₹{internship['stipend']:,}/month</p>
                            <p><strong>🛠 {translate('Skills Required')}:</strong> {translate_dynamic(internship['required_skills'])}</p>
                            <p style="color: #666; font-size: 14px;">{translate_dynamic(internship['description'])}</p>
                        </div>
                        <div style="text-align: center; min-width: 100px;">
                            <div style="background: {'#4caf50' if match_score >= 80 else '#ff9800' if match_score >= 60 else '#2196f3'};
                                            color: white; padding: 10px; border-radius: 50%; font-size: 18px; font-weight: bold; margin-bottom: 5px;">
                                {match_score}%
                            </div>
                            <small style="color: #666;">{translate('Match')}</small>
                        </div>
                    </div>
                </div>
                """, unsafe_allow_html=True)

                col_apply, col_save = st.columns([1, 1])
                with col_apply:
                    if st.button(translate("Apply Now"), key=f"apply_{st.session_state.page_index}{i}{internship['internship_id']}"):
                        st.session_state.show_application_form = True
                        st.session_state.selected_internship = internship
                        st.rerun()
                with col_save:
                    already_saved = any(job['title'] == internship['title'] for job in st.session_state.saved_jobs)
                    if st.button(translate("Save"), key=f"save_{st.session_state.page_index}{i}{internship['internship_id']}"):
                        if not already_saved:
                            saved_job = {
                                'title': internship['title'],
                                'company': internship['company'],
                                'sector': internship['sector'],
                                'location': internship['location'],
                                'stipend': internship['stipend'],
                                'saved_date': datetime.now().strftime('%Y-%m-%d')
                            }
                            st.session_state.saved_jobs.append(saved_job)
                            st.success(translate(f"{internship['title']} saved to your wishlist!"))
                        else:
                            st.info(translate("Already saved to your wishlist."))

            if st.button(translate("Browse More Internships"), key=f"browse_main_{st.session_state.page_index}"):
                st.session_state.page_index = (st.session_state.page_index + 1) % len(st.session_state.recommendations_pages)
                st.rerun()

    selected_internship = st.session_state.get('selected_internship', None)
    if st.session_state.get('show_application_form', False) and selected_internship is not None:
        show_application_form(selected_internship)
        return

    with col2:
        render_dashboard(internships)

    st.markdown("---")
    st.markdown(f"""
    <div style="text-align: center; color: #666; padding: 20px;">
        <p> <strong>{translate('PM Internship Scheme - Empowering India\'s Youth')}</strong></p>
        <p><em>{translate('Making internship discovery simple for everyone!')}</em></p>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()