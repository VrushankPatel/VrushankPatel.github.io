document.addEventListener('DOMContentLoaded', () => {
    // Initialize System Time
    const sysTimeEl = document.getElementById('sys-time');
    const updateTime = () => {
        const now = new Date();
        sysTimeEl.textContent = now.toISOString().replace('T', ' ').slice(0, 19) + 'Z';
    };
    setInterval(updateTime, 1000);
    updateTime();

    // Populate Quick Links in Profile Rail
    const quickLinksEl = document.getElementById('quick-links');
    if (quickLinksEl && portfolioData.contact) {
        const links = [
            { name: 'GitHub', url: portfolioData.contact.github },
            { name: 'LinkedIn', url: portfolioData.contact.linkedin },
            { name: 'Email', url: `mailto:${portfolioData.contact.email}` }
        ];
        
        links.forEach(link => {
            if (link.url) {
                const a = document.createElement('a');
                a.href = link.url;
                a.className = 'quick-link';
                a.target = '_blank';
                a.innerHTML = `[↗] ${link.name}`;
                quickLinksEl.appendChild(a);
            }
        });
    }

    // Populate Dynamic Profile Stats
    const statsContainer = document.getElementById('dynamic-profile-stats');
    if (statsContainer && portfolioData.profile) {
        let statsHtml = '';
        if (portfolioData.profile.metrics.experience) {
            statsHtml += `
                <div class="stat-row">
                    <span class="stat-key">EXP_YRS</span>
                    <span class="stat-val highlight-blue">${portfolioData.profile.metrics.experience}</span>
                </div>`;
        }
        if (portfolioData.profile.metrics.domain) {
            statsHtml += `
                <div class="stat-row">
                    <span class="stat-key">DOMAIN</span>
                    <span class="stat-val">${portfolioData.profile.metrics.domain}</span>
                </div>`;
        }
        statsContainer.innerHTML = statsHtml;
    }

    // Populate Dynamic Location
    const locContainer = document.getElementById('dynamic-location');
    if (locContainer && portfolioData.profile && portfolioData.profile.location) {
        locContainer.innerHTML = `
            <div class="stat-row" style="border-bottom: none;">
                <span class="stat-key">LOCATION</span>
                <span class="stat-val" id="location-text" style="cursor: pointer; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--accent-green)'" onmouseout="this.style.color='inherit'" title="Click to focus globe">${portfolioData.profile.location}</span>
            </div>
        `;
    }

    // Terminal Logic
    const terminalInput = document.getElementById('terminal-input');
    const outputContent = document.getElementById('output-content');
    const commandList = document.getElementById('command-list');

    const commands = {
        help: renderHelp,
        about: renderAbout,
        experience: renderExperience,
        skills: renderSkills,
        education: renderEducation,
        projects: renderProjects,
        contact: renderContact,
        resume: renderResume,
        clear: clearTerminal
    };

    // Initial Welcome Message
    printToOutput(`<div class="cmd-echo">VRUSHANK_PATEL_SYS initialized. Type <span class="highlight-green">'help'</span> to see available commands.</div>`);
    
    // Auto-render all sections for mobile/tablet view
    if (window.innerWidth <= 992) {
        renderAbout(false);
        renderExperience();
        renderSkills();
        renderEducation();
        renderProjects();
        renderContact();
    } else {
        renderAbout(false); // Initial render without echo
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';
            
            if (val) {
                processCommand(val);
            }
        }
    });

    // Sidebar command clicking
    if (commandList) {
        commandList.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (li && li.dataset.cmd) {
                processCommand(li.dataset.cmd);
                // On mobile, scroll to input
                if (window.innerWidth <= 768) {
                    terminalInput.focus();
                }
            }
        });
    }

    function processCommand(cmd) {
        if (cmd === 'clear') {
            commands[cmd]();
            return;
        }
        
        const isCommandValid = !!commands[cmd];
        
        if (isCommandValid) {
            const sectionId = `section-${cmd}`;
            const echoId = `echo-${cmd}`;
            const existingSection = document.getElementById(sectionId);
            const existingEcho = document.getElementById(echoId);
            
            // If the section is already at the bottom, just flicker it
            if (existingSection && outputContent.lastElementChild === existingSection) {
                existingSection.classList.remove('flicker-highlight');
                void existingSection.offsetWidth; // trigger reflow
                existingSection.classList.add('flicker-highlight');
                scrollToBottom();
                return;
            }
            
            // Remove old echo if it exists to prevent duplication
            if (existingEcho) {
                existingEcho.remove();
            }
            
            // Add new echo
            const echoDiv = document.createElement('div');
            echoDiv.id = echoId;
            echoDiv.className = 'cmd-echo';
            echoDiv.innerHTML = `<span class="prompt">root@vpatel:~$</span> ${cmd}`;
            outputContent.appendChild(echoDiv);
            
            // Render the section (moves to bottom if exists)
            commands[cmd]();
        } else {
            printToOutput(`<div class="cmd-echo"><span class="prompt">root@vpatel:~$</span> ${cmd}</div>`);
            printToOutput(`<div class="cmd-echo" style="color: var(--accent-red)">Command not found: ${cmd}. Type 'help' for a list of valid commands.</div>`);
        }
        
        scrollToBottom();
    }

    function printToOutput(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        outputContent.appendChild(div);
    }

    function renderSection(cmdId, html) {
        let existingSection = document.getElementById(`section-${cmdId}`);
        if (existingSection) {
            // Move to bottom instead of duplicating
            outputContent.appendChild(existingSection);
        } else {
            const div = document.createElement('div');
            div.id = `section-${cmdId}`;
            div.innerHTML = html;
            outputContent.appendChild(div);
        }
    }

    function scrollToBottom() {
        // give browser a tick to render
        setTimeout(() => {
            outputContent.scrollTop = outputContent.scrollHeight;
            terminalInput.focus();
        }, 10);
    }

    // Command Implementations
    function clearTerminal() {
        outputContent.innerHTML = '';
    }

    function renderHelp() {
        let html = `
            <h2 class="section-title">Available Commands</h2>
            <div class="card-body">
                <ul>
                    <li><span class="highlight-green">about</span> - Display professional summary</li>
                    <li><span class="highlight-green">experience</span> - Show work history and impact</li>
                    <li><span class="highlight-green">skills</span> - List technical expertise</li>
                    <li><span class="highlight-green">education</span> - Show academic background</li>
                    <li><span class="highlight-green">projects</span> - Display portfolio projects</li>
                    <li><span class="highlight-green">contact</span> - Show contact information</li>
                    <li><span class="highlight-green">resume</span> - Open full resume document</li>
                    <li><span class="highlight-green">clear</span> - Clear terminal output</li>
                </ul>
            </div>
        `;
        renderSection('help', html);
    }

    function renderAbout(echo = true) {
        let html = `
            <h2 class="section-title">System Profile</h2>
            <div class="data-card">
                <div class="card-header">
                    <div class="card-title">${portfolioData.profile.name}</div>
                    <div class="card-meta">STATUS: ONLINE</div>
                </div>
                <div class="card-subtitle mb-2" style="margin-bottom: 1rem;">${portfolioData.profile.role}</div>
                <div class="card-body">
                    <p>${portfolioData.profile.summary}</p>
                </div>
            </div>
        `;
        renderSection('about', html);
    }

    function renderExperience() {
        let html = `<h2 class="section-title">Work Experience</h2>`;
        
        portfolioData.experience.forEach(exp => {
            let resHtml = exp.responsibilities.map(r => {
                if (Array.isArray(r)) {
                    return `<ul style="margin-top: 5px;">${r.map(subR => `<li>${subR}</li>`).join('')}</ul>`;
                }
                return `<li>${r}</li>`;
            }).join('');
            html += `
                <div class="data-card">
                    <div class="card-header">
                        <div>
                            <div class="card-title">${exp.company}</div>
                            <div class="card-subtitle">${exp.title}</div>
                        </div>
                        <div class="card-meta">
                            <div>${exp.date}</div>
                            <div>${exp.location}</div>
                        </div>
                    </div>
                    <div class="card-body">
                        <ul>${resHtml}</ul>
                    </div>
                </div>
            `;
        });
        renderSection('experience', html);
    }

    function renderSkills() {
        let html = `<h2 class="section-title">Technical Skills</h2><div class="skills-grid">`;
        
        portfolioData.skills.forEach(skillGroup => {
            let itemsHtml = skillGroup.items.map(item => `<span class="skill-chip">${item}</span>`).join('');
            html += `
                <div class="data-card">
                    <div class="skill-category">${skillGroup.category}</div>
                    <div class="skill-list">${itemsHtml}</div>
                </div>
            `;
        });
        
        html += `</div>`;
        renderSection('skills', html);
    }

    function renderEducation() {
        let html = `<h2 class="section-title">Education</h2>`;
        
        portfolioData.education.forEach(edu => {
            html += `
                <div class="data-card">
                    <div class="card-header">
                        <div>
                            <div class="card-title">${edu.institution}</div>
                            <div class="card-subtitle">${edu.degree}</div>
                        </div>
                        <div class="card-meta">
                            <div>${edu.date}</div>
                            <div>${edu.location}</div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p>${edu.gpa}</p>
                    </div>
                </div>
            `;
        });
        renderSection('education', html);
    }

    function renderProjects() {
        let html = `<h2 class="section-title">Projects Directory</h2><div class="projects-grid">`;
        
        portfolioData.projects.forEach(proj => {
            let linkHtml = proj.link && proj.link !== "#" ? `<a href="${proj.link}" target="_blank" class="highlight-blue">[OPEN_LINK ↗]</a>` : '';
            html += `
                <div class="project-card">
                    <div class="project-name">${proj.name}</div>
                    <div class="project-desc">${proj.description}</div>
                    <div>${linkHtml}</div>
                </div>
            `;
        });
        
        html += `</div>`;
        renderSection('projects', html);
    }

    function renderContact() {
        let contact = portfolioData.contact;
        let html = `
            <h2 class="section-title">Contact Protocol</h2>
            <div class="data-card">
                <div class="card-body">
                    <div class="stat-row">
                        <span class="stat-key">EMAIL</span>
                        <span class="stat-val"><a href="mailto:${contact.email}">${contact.email}</a></span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-key">PHONE</span>
                        <span class="stat-val">${contact.phone}</span>
                    </div>
                    <div class="stat-row" style="justify-content: flex-start; padding-top: 8px;">
                        <a href="${contact.github}" target="_blank" style="text-decoration: underline; font-weight: bold;">GITHUB</a>
                    </div>
                    <div class="stat-row" style="justify-content: flex-start;">
                        <a href="${contact.linkedin}" target="_blank" style="text-decoration: underline; font-weight: bold;">LINKEDIN</a>
                    </div>
                    <div class="stat-row" style="justify-content: flex-start;">
                        <a href="${contact.codersrank}" target="_blank" style="text-decoration: underline; font-weight: bold;">CODERSRANK</a>
                    </div>
                </div>
            </div>
        `;
        renderSection('contact', html);
    }

    function renderResume() {
        printToOutput(`<div class="cmd-echo">Initiating document download sequence...</div>`);
        window.open('https://vrushankpatel.github.io/Vrushank_Resume.pdf', '_blank');
    }
    
    // Focus terminal input when clicking on output area
    outputContent.addEventListener('click', (e) => {
        // don't focus if they are clicking a link or selecting text
        if (e.target.tagName !== 'A' && window.getSelection().toString() === '') {
            terminalInput.focus();
        }
    });
});
