const portfolioData = {
  profile: {
    name: "Vrushank Patel",
    role: "Senior Software Developer",
    summary: "Senior backend engineer with 5+ years of experience specializing in capital markets, low-latency order matching, and high-reliability systems. Proven track record in developing complex trading systems, orchestrating cloud-native architectures on AWS EKS, and creating internal productivity tools. Strong expertise in Java, Spring Boot, DevOps, and building robust financial infrastructure.",
    phone: "+91 9601501725",
    email: "vrushankpatel5@gmail.com",
    location: "Bangalore, India",
    metrics: {
      experience: "5+ Years",
      domain: "Capital Markets",
      specialty: "High-Speed Backend",
      latency: "Sub-millisecond"
    }
  },
  contact: {
    email: "vrushankpatel5@gmail.com",
    phone: "+91 9601501725",
    github: "https://github.com/VrushankPatel",
    linkedin: "https://www.linkedin.com/in/vrushank-patel-69b682180/",
    codersrank: "https://profile.codersrank.io/user/vrushankpatel"
  },
  experience: [
    {
      company: "NASDAQ",
      title: "Senior Software Developer",
      date: "Nov 2022 – Present",
      location: "Bangalore, IN",
      responsibilities: [
        "Developed and optimized solutions for a high-speed order matching and execution system using Java and Spring Framework. Delivered customer-tailored enhancements for Forex, Equities, and Crypto across LATAM, US, and EU, including onsite acceptance testing in Colombia for an equity trading platform handling 500M plus daily volume.",
        "Containerized and orchestrated deployments on Amazon EKS, improving system uptime and reducing infrastructure cost through better resource utilization.",
        "Developed and customized a framework acting as a Kubernetes operator to streamline Amazon EKS and EKS A deployments, designing partitioned Helm layouts that significantly reduced deployment setup time for a LATAM customer.",
        "Internal tools I built/am building from scratch for the productivity of the team:",
        [
          "KDebug, a debugging utility for Kubernetes-hosted matching engine pods, automates debugger port discovery, local port forwarding, and reattachment handling to simplify remote debugging in non-local environments.",
          "Layout Visualizer, a pipeline-integrated visualization tool that converts deployment layout YAML files into readable graphical views, helping teams review pod counts, replication setup, and configuration changes from release artifacts stored in Artifactory.",
          "Built a Terraform plan visualization tool for the ops team with expandable and collapsible views to inspect planned infrastructure changes and configuration details more easily.",
          "Currently building an MCP server that enables users to deploy/destroy/operate the system through Copilot with controlled internal usage."
        ]
      ]
    },
    {
      company: "Capsystematic Technologies Pvt Ltd.",
      title: "Software Developer",
      date: "Dec 2019 – Nov 2022",
      location: "Bangalore, IN",
      responsibilities: [
        "Developed and modernized backend systems for banking and financial clients using Java, Spring Boot, Apache Camel, and Docker, delivering secure and scalable applications.",
        "Designed and implemented Apache Camel routes to process and route SWIFT MT and ISO 20022 messages across DB, filesystem, HTTP, SOAP, and MQ endpoints, improving integration between front office and core banking systems and reducing message latency.",
        "Migrated a legacy Pro C based system to a modular Java architecture using Spring Boot, JPA, and Spring Security, and built REST APIs for reconciliation, settlement, dispute management, and corporate card operations.",
        "Built an internal automation tool using Python and FastAPI to generate Java entities and mappings from SQL procedures and SWIFT message definitions, improving developer productivity and reducing manual mapping errors."
      ]
    },
    {
      company: "Capsystematic Technologies Pvt Ltd.",
      title: "SDE Intern",
      date: "Sept 2019 – Dec 2019",
      location: "Bangalore, IN",
      responsibilities: [
        "Worked with Apache Camel by analyzing existing routes and adding tests to improve reliability and coverage.",
        "Implemented Camel routes for SWIFT MT and ISO 20022 message processing, contributing to middleware workflows under mentorship."
      ]
    }
  ],
  skills: [
    { category: "Programming Languages", items: ["Java", "Python"] },
    { category: "Frameworks & Libraries", items: ["Spring Boot", "Spring Web", "Spring Data JPA", "JUnit", "Mockito"] },
    { category: "DB & Streaming", items: ["MySQL (query optimization, indexing, transactions)", "Redis", "Apache Kafka"] },
    { category: "Cloud & DevOps", items: ["AWS (EC2, S3, Lambda, EKS, ECR)", "Docker", "GitLab CI/CD"] }
  ],
  education: [
    {
      institution: "Apollo Institute of Engineering (GTU)",
      degree: "B.E. – Information Technology",
      date: "Jul 2015 - May 2019",
      location: "Ahmedabad, IN",
      gpa: "CGPA: 8.24"
    }
  ],
  projects: [
    {
      name: "APEX",
      description: "Project documentation and details.",
      link: "https://apex-docs.readthedocs.io/"
    },
    {
      name: "BlueLink",
      description: "Project repository and releases.",
      link: "https://github.com/VrushankPatel/bluelink/releases"
    },
    {
      name: "Marketron",
      description: "Marketron web application.",
      link: "https://marketron-x.web.app/"
    },
    {
      name: "Maxine",
      description: "Maxine project documentation.",
      link: "https://maxine.readthedocs.io/"
    },
    {
      name: "Complexica",
      description: "Complexica server implementation.",
      link: "https://github.com/VrushankPatel/complexica-server"
    },
    {
      name: "iBoard",
      description: "iBoard web application.",
      link: "https://iboard-x.web.app/"
    },
    {
      name: "More Projects",
      description: "Explore more on GitHub.",
      link: "https://github.com/VrushankPatel"
    }
  ],
  theme: {
    colors: {
      background: "#0a0a0a",
      panelBg: "#121212",
      textPrimary: "#e0e0e0",
      textSecondary: "#888888",
      accentPrimary: "#00ff9d", // Terminal green
      accentSecondary: "#00a8ff", // Terminal blue
      border: "#2a2a2a",
      error: "#ff3366",
      warning: "#ffcc00"
    }
  }
};
