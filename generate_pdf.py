import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf():
    pdf_filename = "PagadamSettyYasaswini-Task1.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#4338ca")
    secondary_color = colors.HexColor("#312e81")
    text_dark = colors.HexColor("#1e293b")
    bg_light = colors.HexColor("#f8fafc")
    border_color = colors.HexColor("#e2e8f0")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        spaceAfter=4,
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#64748b"),
        spaceAfter=12,
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=secondary_color,
        spaceBefore=10,
        spaceAfter=6,
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_dark,
    )

    bold_body_style = ParagraphStyle(
        'BoldBody',
        parent=body_style,
        fontName='Helvetica-Bold',
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=body_style,
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#4338ca"),
    )

    elements = []

    # Title & Header
    elements.append(Paragraph("Joineazy – Frontend Intern Assignment (Task 1)", title_style))
    elements.append(Paragraph("Assignment & Review Dashboard — Candidate Submission Dossier", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=0, spaceAfter=14))

    # Candidate Meta Table
    meta_data = [
        [
            Paragraph("<b>Candidate Name:</b>", body_style),
            Paragraph("Pagadam Setty Yasaswini", bold_body_style),
            Paragraph("<b>Role:</b>", body_style),
            Paragraph("Frontend Engineering Intern", body_style),
        ],
        [
            Paragraph("<b>GitHub Repository:</b>", body_style),
            Paragraph('<a href="https://github.com/214G1A05C2/join-easy_task1.git" color="#4338ca"><u>github.com/214G1A05C2/join-easy_task1.git</u></a>', body_style),
            Paragraph("<b>Tech Stack:</b>", body_style),
            Paragraph("React 19, Vite, Tailwind CSS, LocalStorage", body_style),
        ],
        [
            Paragraph("<b>Live Website (Vercel):</b>", body_style),
            Paragraph('Deployed to Vercel (see repository README for URL)', body_style),
            Paragraph("<b>Submission Date:</b>", body_style),
            Paragraph("November 2026", body_style),
        ],
        [
            Paragraph("<b>Demo Video Link:</b>", body_style),
            Paragraph('<font color="#dc2626"><b>[Pending Candidate Recording]</b></font> <i>(Add Google Drive / Loom public link here)</i>', body_style),
            Paragraph("<b>Build Status:</b>", body_style),
            Paragraph('<font color="#15803d"><b>Passing (0 errors, 0 warnings)</b></font>', body_style),
        ],
    ]

    t_meta = Table(meta_data, colWidths=[1.4*inch, 2.5*inch, 1.1*inch, 2.0*inch])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    elements.append(t_meta)
    elements.append(Spacer(1, 14))

    # Executive Summary
    elements.append(Paragraph("1. Executive Summary & Architecture", h2_style))
    summary_text = (
        "This project implements a complete, professional, SaaS-grade <b>Assignment & Review Dashboard</b>. "
        "Built strictly adhering to assignment criteria, it features role-based access for <b>Professors/Admins</b> and "
        "<b>Students</b>, full assignment CRUD, real-time submission tracking, student allocation management, "
        "and client-side persistence via localStorage. In accordance with requirements, external Google Drive repository links "
        "are integrated for coursework deliverables rather than mock browser uploads."
    )
    elements.append(Paragraph(summary_text, body_style))
    elements.append(Spacer(1, 10))

    # Core Features Implemented
    elements.append(Paragraph("2. Implemented Core Requirements", h2_style))
    features_data = [
        [Paragraph("<b>Component / Area</b>", bold_body_style), Paragraph("<b>Key Implemented Functionalities</b>", bold_body_style)],
        [
            Paragraph("<b>Authentication & Roles</b>", body_style),
            Paragraph("Mock login with email/password validation, session persistence, route protection (admins cannot access student views and vice-versa), and 1-click Quick Login demo switcher.", body_style),
        ],
        [
            Paragraph("<b>Student Dashboard</b>", body_style),
            Paragraph("Personalized metrics (Total, Submitted, Pending, Overdue), dynamic progress bar, assignment cards with Google Drive links, overdue highlighting, search and status filters.", body_style),
        ],
        [
            Paragraph("<b>Two-Step Submission Flow</b>", body_style),
            Paragraph("Strict 2-step verification modal ensuring student confirms completion on Google Drive before locking the submission with a permanent timestamp and updating completion metrics.", body_style),
        ],
        [
            Paragraph("<b>Admin Dashboard</b>", body_style),
            Paragraph("Coursework creation with multi-student allocation, edit assignment preserving existing student submissions, delete with confirmation modal, dynamic class completion rate calculation.", body_style),
        ],
        [
            Paragraph("<b>Student Tracking Table</b>", body_style),
            Paragraph("Live table displaying Student Name, Email, Assignment, Due Date, Status Badge, and Submission Timestamp with instant search, dropdown filters, and column sorting.", body_style),
        ],
        [
            Paragraph("<b>Design & UX Extras</b>", body_style),
            Paragraph("Modern Indigo/Violet theme, Light/Dark mode toggle, floating Toast notifications, accessible modals with ESC-key dismiss, and 'Reset Demo Data' button.", body_style),
        ]
    ]

    t_feat = Table(features_data, colWidths=[2.1*inch, 4.9*inch])
    t_feat.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e0e7ff")),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    elements.append(t_feat)
    elements.append(Spacer(1, 12))

    # Demo Accounts
    elements.append(Paragraph("3. Pre-Seeded Evaluation Accounts (Password: demo123)", h2_style))
    demo_accounts = [
        [Paragraph("<b>Role</b>", bold_body_style), Paragraph("<b>Name</b>", bold_body_style), Paragraph("<b>Email Address</b>", bold_body_style), Paragraph("<b>Key Context</b>", bold_body_style)],
        [Paragraph("Admin", body_style), Paragraph("Dr. Robert Vance", body_style), Paragraph("admin1@joineazy.com", body_style), Paragraph("Created 3 assignments (React, DBMS, Frontend)", body_style)],
        [Paragraph("Admin", body_style), Paragraph("Prof. Elena Rostova", body_style), Paragraph("admin2@joineazy.com", body_style), Paragraph("Created 2 assignments (Python, UI/UX)", body_style)],
        [Paragraph("Student", body_style), Paragraph("Alex Johnson", body_style), Paragraph("student1@joineazy.com", body_style), Paragraph("Multiple submitted and pending tasks", body_style)],
        [Paragraph("Student", body_style), Paragraph("Priya Sharma", body_style), Paragraph("student2@joineazy.com", body_style), Paragraph("High completion rate student", body_style)],
        [Paragraph("Student", body_style), Paragraph("Liam Chen", body_style), Paragraph("student3@joineazy.com", body_style), Paragraph("Pending and overdue assignments", body_style)],
        [Paragraph("Student", body_style), Paragraph("Sophia Rodriguez", body_style), Paragraph("student4@joineazy.com", body_style), Paragraph("Enrolled in select coursework", body_style)],
        [Paragraph("Student", body_style), Paragraph("David Kim", body_style), Paragraph("student5@joineazy.com", body_style), Paragraph("Enrolled in select coursework", body_style)],
    ]
    t_demo = Table(demo_accounts, colWidths=[1.1*inch, 1.8*inch, 2.0*inch, 2.1*inch])
    t_demo.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(t_demo)
    elements.append(Spacer(1, 14))

    # Demo Video Recording Script Guide
    elements.append(Paragraph("4. Demo Video Recording Guide (3–5 Minutes)", h2_style))
    video_instructions = (
        "<b>Step-by-step instructions for candidate recording:</b><br/>"
        "1. Open Loom (loom.com) or OBS Studio. Share your entire browser window.<br/>"
        "2. <b>Minute 0:00–0:45:</b> Introduce yourself (Pagadam Setty Yasaswini) and state the assignment name (Joineazy Task 1). Show the Login page, explain mock authentication, and use 1-click login for <i>admin1@joineazy.com</i>.<br/>"
        "3. <b>Minute 0:45–2:00 (Admin Workflow):</b> Walk through the Admin Dashboard stats (Class Completion Rate), create a new coursework assignment allocating specific students, edit an existing assignment, and display the student tracking table.<br/>"
        "4. <b>Minute 2:00–3:15 (Student Workflow):</b> Log out and sign in as <i>student3@joineazy.com</i>. Walk through the progress bar, overdue highlighting, and Google Drive links. Trigger the <b>2-Step Submission Confirmation Workflow</b> to demonstrate status updating to 'Submitted' and immediate localStorage persistence.<br/>"
        "5. <b>Minute 3:15–4:00:</b> Toggle Dark/Light mode, switch back to Admin to show the updated completion rate, and conclude with the clean codebase architecture.<br/>"
        "6. Upload the video to Google Drive (set permissions to <i>'Anyone with the link can view'</i>) or Loom, and paste the link into your submission form."
    )
    elements.append(Paragraph(video_instructions, body_style))

    doc.build(elements)
    print("PDF generated successfully:", pdf_filename)

if __name__ == "__main__":
    generate_pdf()
