 // Theme Toggle (Dark/Light Mode)
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const htmlElement = document.documentElement; // Get the <html> element

        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            htmlElement.classList.remove('dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            if (htmlElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Add event to initial delete buttons
        document.querySelectorAll('.delete-skill').forEach(button => {
            button.addEventListener('click', function() {
                const skillItem = this.closest('.skill-item');
                if (document.querySelectorAll('.skill-item').length > 1) {
                    skillItem.remove();
                    updateProgress();
                    schedulePreviewUpdate();
                }
            });
        });

        document.querySelectorAll('.delete-project').forEach(button => {
            button.addEventListener('click', function() {
                const projectItem = this.closest('.project-item');
                if (document.querySelectorAll('.project-item').length > 1) {
                    projectItem.remove();
                    updateProgress();
                    schedulePreviewUpdate();
                }
            });
        });

        // Add event to initial delete buttons for new sections
        document.querySelectorAll('.delete-experience').forEach(button => {
            button.addEventListener('click', function() {
                const experienceItem = this.closest('.experience-item');
                if (document.querySelectorAll('.experience-item').length > 1) {
                    experienceItem.remove();
                    updateProgress();
                    schedulePreviewUpdate();
                }
            });
        });

        document.querySelectorAll('.delete-education').forEach(button => {
            button.addEventListener('click', function() {
                const educationItem = this.closest('.education-item');
                if (document.querySelectorAll('.education-item').length > 1) {
                    educationItem.remove();
                    updateProgress();
                    schedulePreviewUpdate();
                }
            });
        });

        // Form interactions
        // Add skill
        document.getElementById('add-skill').addEventListener('click', function() {
            const container = document.getElementById('skills-container');
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item flex items-center mb-2';
            skillDiv.innerHTML = `
                <input type="text" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Skill (e.g. JavaScript)">
                <button type="button" class="ml-2 text-red-500 hover:text-red-700 delete-skill">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(skillDiv);

            // Add event to delete button
            skillDiv.querySelector('.delete-skill').addEventListener('click', function() {
                if (document.querySelectorAll('.skill-item').length > 1) {
                    container.removeChild(skillDiv);
                    updateProgress();
                    schedulePreviewUpdate();
                }
            });

            // Add input event to new skill field
            skillDiv.querySelector('input').addEventListener('input', function() {
                updateProgress();
                schedulePreviewUpdate();
            });

            updateProgress();
            schedulePreviewUpdate();
        });

        // Add project
        document.getElementById('add-project').addEventListener('click', function() {
            const container = document.getElementById('projects-container');
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-item bg-gray-50 p-4 rounded-lg border border-gray-200';
            projectDiv.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 project-title" placeholder="Project Title">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                        <input type="url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 project-url" placeholder="https://">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 project-description" placeholder="What does this project do? What technologies did you use?"></textarea>
                    <p class="text-xs text-gray-500 mt-1">
                        <button class="text-blue-600 hover:underline ai-suggestion-btn" data-target="project-description">✨ Generate with AI</button>
                        <span class="ai-loading-spinner hidden ml-2 text-blue-500"><i class="fas fa-spinner fa-spin"></i></span>
                    </p>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 project-technologies" placeholder="React, Node.js, MongoDB">
                    </div>
                    <button type="button" class="ml-4 mt-5 text-red-500 hover:text-red-700 delete-project">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(projectDiv);

            // Add event to delete button
            projectDiv.querySelector('.delete-project').addEventListener('click', function() {
                if (document.querySelectorAll('.project-item').length > 1) {
                    container.removeChild(projectDiv);
                    updateProgress();
                    schedulePreviewUpdate();
                }
            });

            // Add input event listeners to new project fields
            const inputs = projectDiv.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    updateProgress();
                    schedulePreviewUpdate();
                });
            });

            // Add AI button listener for new project
            projectDiv.querySelector('[data-target="project-description"]').addEventListener('click', handleAiSuggestion);

            updateProgress();
            schedulePreviewUpdate();
        });

        // Add Experience
        document.getElementById('add-experience').addEventListener('click', function() {
            const container = document.getElementById('experience-container');
            const experienceDiv = document.createElement('div');
            experienceDiv.className = 'experience-item bg-gray-50 p-4 rounded-lg border border-gray-200';
            experienceDiv.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 experience-company" placeholder="Company Name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 experience-title" placeholder="Software Engineer">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 experience-start-date" placeholder="Jan 2020">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">End Date (or "Present")</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 experience-end-date" placeholder="Dec 2022 / Present">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                    <textarea rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 experience-description" placeholder="Key responsibilities and achievements..."></textarea>
                    <p class="text-xs text-gray-500 mt-1">
                        <button class="text-blue-600 hover:underline ai-suggestion-btn" data-target="experience-description">✨ Generate with AI</button>
                        <span class="ai-loading-spinner hidden ml-2 text-blue-500"><i class="fas fa-spinner fa-spin"></i></span>
                    </p>
                </div>
                <div class="flex justify-end">
                    <button type="button" class="ml-4 text-red-500 hover:text-red-700 delete-experience">
                        <i class="fas fa-trash"></i> Delete Experience
                    </button>
                </div>
            `;
            container.appendChild(experienceDiv);

            // Add event to delete button
            experienceDiv.querySelector('.delete-experience').addEventListener('click', function() {
                if (document.querySelectorAll('.experience-item').length > 1) {
                    container.removeChild(experienceDiv);
                    updateProgress();
                    schedulePreviewUpdate();
                }
            });

            // Add input event listeners to new experience fields
            const inputs = experienceDiv.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    updateProgress();
                    schedulePreviewUpdate();
                });
            });

            // Add AI button listener for new experience
            experienceDiv.querySelector('[data-target="experience-description"]').addEventListener('click', handleAiSuggestion);

            updateProgress();
            schedulePreviewUpdate();
        });

        // Add Education
        document.getElementById('add-education').addEventListener('click', function() {
            const container = document.getElementById('education-container');
            const educationDiv = document.createElement('div');
            educationDiv.className = 'education-item bg-gray-50 p-4 rounded-lg border border-gray-200';
            educationDiv.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 education-institution" placeholder="University Name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Degree / Field of Study</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 education-degree" placeholder="B.Sc. in Computer Science">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Graduation Date (or "Expected")</label>
                        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 education-graduation-date" placeholder="May 2019 / Expected 2024">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description (e.g., coursework, honors)</label>
                    <textarea rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 education-description" placeholder="Relevant coursework, academic achievements, projects..."></textarea>
                    <p class="text-xs text-gray-500 mt-1">
                        <button class="text-blue-600 hover:underline ai-suggestion-btn" data-target="education-description">✨ Generate with AI</button>
                        <span class="ai-loading-spinner hidden ml-2 text-blue-500"><i class="fas fa-spinner fa-spin"></i></span>
                    </p>
                </div>
                <div class="flex justify-end">
                    <button type="button" class="ml-4 text-red-500 hover:text-red-700 delete-education">
                        <i class="fas fa-trash"></i> Delete Education
                    </button>
                </div>
            `;
            container.appendChild(educationDiv);

            // Add event to delete button
            educationDiv.querySelector('.delete-education').addEventListener('click', function() {
                if (document.querySelectorAll('.education-item').length > 1) {
                    container.removeChild(educationDiv);
                    updateProgress();
                    schedulePreviewUpdate();
                }
            });

            // Add input event listeners to new education fields
            const inputs = educationDiv.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    updateProgress();
                    schedulePreviewUpdate();
                });
            });

            // Add AI button listener for new education
            educationDiv.querySelector('[data-target="education-description"]').addEventListener('click', handleAiSuggestion);

            updateProgress();
            schedulePreviewUpdate();
        });

        // Profile picture upload
        document.getElementById('profilePic').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('profilePreview');
                    preview.src = event.target.result;
                    preview.classList.remove('hidden');
                    document.getElementById('profilePlaceholder').classList.add('hidden');
                    updateProgress();
                    schedulePreviewUpdate();
                };
                reader.readAsDataURL(file);
            }
        });

        // Theme selection
        let selectedTheme = 'minimal';
        function selectTheme(element) {
            // Remove selection from all themes
            document.querySelectorAll('.theme-selector').forEach(theme => {
                theme.classList.remove('ring-4', 'ring-blue-500');
            });

            // Add selection to clicked theme
            element.classList.add('ring-4', 'ring-blue-500');
            selectedTheme = element.getAttribute('data-theme');
            updateProgress();

            // Generate preview for the selected theme
            generatePreview();
        }

        // Device toggle for preview
        document.getElementById('device-toggle').addEventListener('click', function() {
            const options = document.getElementById('device-options');
            options.classList.toggle('hidden');
        });

        // Device selection for preview
        document.querySelectorAll('#device-options a').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const device = this.getAttribute('data-device');
                const wrapper = document.getElementById('preview-wrapper');

                // Reset all classes
                wrapper.className = 'preview-container bg-white rounded-xl shadow-lg overflow-hidden border-4 border-gray-200 max-w-6xl mx-auto relative transition-colors duration-300';

                // Add device-specific classes
                if (device === 'desktop') {
                    wrapper.classList.add('max-w-6xl', 'mx-auto');
                    document.getElementById('device-toggle').innerHTML = '<i class="fas fa-desktop mr-2"></i> Desktop <i class="fas fa-chevron-down ml-2 text-xs"></i>';
                } else if (device === 'tablet') {
                    wrapper.classList.add('max-w-3xl', 'mx-auto');
                    document.getElementById('device-toggle').innerHTML = '<i class="fas fa-tablet-alt mr-2"></i> Tablet <i class="fas fa-chevron-down ml-2 text-xs"></i>';
                } else if (device === 'mobile') {
                    wrapper.classList.add('max-w-xs', 'mx-auto');
                    document.getElementById('device-toggle').innerHTML = '<i class="fas fa-mobile-alt mr-2"></i> Mobile <i class="fas fa-chevron-down ml-2 text-xs"></i>';
                }

                // Hide options
                document.getElementById('device-options').classList.add('hidden');
            });
        });

        // Refresh preview
        document.getElementById('refresh-preview').addEventListener('click', function() {
            generatePreview();
        });

        // Website Structure Selection
        let selectedStructure = 'full'; // Default structure
        document.querySelectorAll('input[name="website-structure"]').forEach(radio => {
            radio.addEventListener('change', function() {
                selectedStructure = this.value;
                updateProgress();
                schedulePreviewUpdate();
            });
        });

        // Update progress bar
        function updateProgress() {
            let progress = 0;
            const totalFields = 15; // Base fields

            // Check required fields
            if (document.getElementById('fullName').value) progress++;
            if (document.getElementById('jobTitle').value) progress++;
            if (document.getElementById('bio').value) progress++;
            if (!document.getElementById('profilePreview').classList.contains('hidden')) progress++;
            if (document.getElementById('location').value) progress++;

            // Check skills
            const skillInputs = document.querySelectorAll('#skills-container .skill-item input');
            if (skillInputs.length > 0 && Array.from(skillInputs).some(input => input.value)) progress++;

            // Check social links
            const socialLinks = [
                document.getElementById('github').value,
                document.getElementById('linkedin').value,
                document.getElementById('website').value
            ];
            if (socialLinks.some(link => link)) progress++;

            // Check projects
            const projectItems = document.querySelectorAll('.project-item');
            if (projectItems.length > 0) progress++;

            // Check experience (at least one field in one experience item)
            const experienceItems = document.querySelectorAll('.experience-item');
            if (experienceItems.length > 0 && Array.from(experienceItems).some(item =>
                item.querySelector('.experience-company').value ||
                item.querySelector('.experience-title').value ||
                item.querySelector('.experience-start-date').value ||
                item.querySelector('.experience-end-date').value ||
                item.querySelector('.experience-description').value
            )) progress++;

            // Check education (at least one field in one education item)
            const educationItems = document.querySelectorAll('.education-item');
            if (educationItems.length > 0 && Array.from(educationItems).some(item =>
                item.querySelector('.education-institution').value ||
                item.querySelector('.education-degree').value ||
                item.querySelector('.education-graduation-date').value ||
                item.querySelector('.education-description').value
            )) progress++;


            // Check contact info
            if (document.getElementById('email').value) progress++;

            // Check if theme is selected
            if (selectedTheme) progress++;

            // Check if structure is selected
            if (selectedStructure) progress++;


            // Calculate percentage
            // Adjust totalFields to account for new sections
            const adjustedTotalFields = totalFields + 3; // +1 for Experience, +1 for Education, +1 for Structure
            const progressPercent = Math.round((progress / adjustedTotalFields) * 100);

            document.getElementById('progress-bar').style.width = progressPercent + '%';
            document.getElementById('progress-percent').textContent = progressPercent + '%';
        }

        // Debounce function for preview generation
        let previewTimeout;
        function schedulePreviewUpdate() {
            clearTimeout(previewTimeout);
            previewTimeout = setTimeout(function() {
                generatePreview();
                // Show update status
                const status = document.getElementById('preview-status');
                status.classList.add('show');
                setTimeout(() => {
                    status.classList.remove('show');
                }, 2000);
            }, 300);
        }

        // Set up event listeners for form fields
        const formFields = document.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                updateProgress();
                schedulePreviewUpdate();
            });
        });

        // Function to call Gemini API
        async function callGemini(prompt, isStructured = false) {
            const apiKey = ""; // Canvas will inject the API key at runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            let payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            };

            if (isStructured) {
                payload.generationConfig = {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "ARRAY",
                        items: { "type": "STRING" }
                    }
                };
            }

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    return isStructured ? JSON.parse(text) : text;
                } else {
                    console.error("Gemini API returned an unexpected structure:", result);
                    return null;
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                return null;
            }
        }

        // Handle AI Suggestion Clicks
        async function handleAiSuggestion(event) {
            event.preventDefault();
            const button = event.target.closest('.ai-suggestion-btn');
            const targetType = button.dataset.target;
            const spinner = button.nextElementSibling; // The spinner is the next sibling

            spinner.classList.remove('hidden'); // Show spinner
            button.disabled = true; // Disable button

            let generatedContent = null;

            if (targetType === 'bio') {
                const fullName = document.getElementById('fullName').value;
                const jobTitle = document.getElementById('jobTitle').value;
                const prompt = `Write a concise professional bio (around 50-70 words) for a person named ${fullName} who is a ${jobTitle}. Focus on their passion and experience.`;
                generatedContent = await callGemini(prompt);
                if (generatedContent) {
                    document.getElementById('bio').value = generatedContent;
                }
            } else if (targetType === 'skills') {
                const jobTitle = document.getElementById('jobTitle').value;
                const prompt = `Suggest 5-7 key technical and soft skills for a ${jobTitle}. Provide the response as a JSON array of strings.`;
                generatedContent = await callGemini(prompt, true); // Request structured response
                if (generatedContent && Array.isArray(generatedContent)) {
                    const skillsContainer = document.getElementById('skills-container');
                    // Clear existing skills if any, or append
                    skillsContainer.innerHTML = ''; // Clear existing skills to replace them
                    generatedContent.forEach(skill => {
                        const skillDiv = document.createElement('div');
                        skillDiv.className = 'skill-item flex items-center mb-2';
                        skillDiv.innerHTML = `
                            <input type="text" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Skill (e.g. JavaScript)" value="${skill}">
                            <button type="button" class="ml-2 text-red-500 hover:text-red-700 delete-skill">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        skillsContainer.appendChild(skillDiv);
                        skillDiv.querySelector('.delete-skill').addEventListener('click', function() {
                            if (document.querySelectorAll('.skill-item').length > 1) {
                                skillsContainer.removeChild(skillDiv);
                                updateProgress();
                                schedulePreviewUpdate();
                            }
                        });
                        skillDiv.querySelector('input').addEventListener('input', function() {
                            updateProgress();
                            schedulePreviewUpdate();
                        });
                    });
                }
            } else if (targetType === 'project-description') {
                const projectItem = button.closest('.project-item');
                const projectTitle = projectItem.querySelector('.project-title').value;
                const projectTechnologies = projectItem.querySelector('.project-technologies').value;
                const projectDescriptionTextarea = projectItem.querySelector('.project-description');

                if (projectTitle || projectTechnologies) {
                    const prompt = `Write a brief project description (around 30-50 words) for a project titled "${projectTitle}" using technologies like ${projectTechnologies}.`;
                    generatedContent = await callGemini(prompt);
                    if (generatedContent) {
                        projectDescriptionTextarea.value = generatedContent;
                    }
                } else {
                    alert('Please enter a Project Title or Technologies Used to generate a description.');
                }
            } else if (targetType === 'experience-description') {
                const experienceItem = button.closest('.experience-item');
                const company = experienceItem.querySelector('.experience-company').value;
                const jobTitle = experienceItem.querySelector('.experience-title').value;
                const experienceDescriptionTextarea = experienceItem.querySelector('.experience-description');

                if (company || jobTitle) {
                    const prompt = `Generate 3-4 bullet points describing key responsibilities and achievements for a ${jobTitle} role at ${company}.`;
                    generatedContent = await callGemini(prompt);
                    if (generatedContent) {
                        experienceDescriptionTextarea.value = generatedContent;
                    }
                } else {
                    alert('Please enter Company and Job Title to generate responsibilities.');
                }
            } else if (targetType === 'education-description') {
                const educationItem = button.closest('.education-item');
                const institution = educationItem.querySelector('.education-institution').value;
                const degree = educationItem.querySelector('.education-degree').value;
                const educationDescriptionTextarea = educationItem.querySelector('.education-description');

                if (institution || degree) {
                    const prompt = `Write a brief description (around 30-50 words) for an education entry: ${degree} from ${institution}, including relevant coursework or academic achievements.`;
                    generatedContent = await callGemini(prompt);
                    if (generatedContent) {
                        educationDescriptionTextarea.value = generatedContent;
                    }
                } else {
                    alert('Please enter Institution and Degree to generate a description.');
                }
            }

            spinner.classList.add('hidden'); // Hide spinner
            button.disabled = false; // Enable button
            if (generatedContent) {
                updateProgress();
                schedulePreviewUpdate();
            }
        }

        // Attach event listeners to all AI suggestion buttons
        document.querySelectorAll('.ai-suggestion-btn').forEach(button => {
            button.addEventListener('click', handleAiSuggestion);
        });

        // Data structure to hold all portfolio information
        const getPortfolioData = () => {
            const fullName = document.getElementById('fullName').value || 'John Doe';
            const jobTitle = document.getElementById('jobTitle').value || 'Frontend Developer';
            const bio = document.getElementById('bio').value || 'A passionate developer with experience in building modern web applications.';
            const location = document.getElementById('location').value || 'San Francisco, CA';
            const email = document.getElementById('email').value || 'john.doe@example.com';
            const phone = document.getElementById('phone').value || '';

            const profilePic = document.getElementById('profilePreview').src || 'https://via.placeholder.com/150';

            const skills = [];
            document.querySelectorAll('#skills-container .skill-item input').forEach(input => {
                if (input.value) skills.push(input.value);
            });
            if (skills.length === 0) {
                skills.push('JavaScript', 'React', 'HTML/CSS', 'Node.js');
            }

            const socialLinks = {
                github: document.getElementById('github').value || '#',
                linkedin: document.getElementById('linkedin').value || '#',
                instagram: document.getElementById('instagram').value || '#',
                twitter: document.getElementById('twitter').value || '#',
                website: document.getElementById('website').value || '#'
            };

            const projects = [];
            document.querySelectorAll('.project-item').forEach(project => {
                const title = project.querySelector('.project-title').value || 'E-commerce Website';
                const url = project.querySelector('.project-url').value || '#';
                const description = project.querySelector('.project-description').value || 'A fully functional e-commerce website with product listings, cart functionality, and payment processing.';
                const technologies = project.querySelector('.project-technologies').value || 'React, Node.js, MongoDB';

                projects.push({
                    title,
                    url,
                    description,
                    technologies
                });
            });
            if (projects.length === 0) {
                projects.push({
                    title: 'Portfolio Website',
                    url: '#',
                    description: 'A responsive portfolio website built with modern web technologies.',
                    technologies: 'HTML, CSS, JavaScript'
                });
            }

            // New: Experience
            const experiences = [];
            document.querySelectorAll('.experience-item').forEach(exp => {
                const company = exp.querySelector('.experience-company').value || 'Company Name';
                const title = exp.querySelector('.experience-title').value || 'Job Title';
                const startDate = exp.querySelector('.experience-start-date').value || 'Jan 2020';
                const endDate = exp.querySelector('.experience-end-date').value || 'Dec 2022';
                const description = exp.querySelector('.experience-description').value || 'Responsible for developing and maintaining web applications.';
                experiences.push({ company, title, startDate, endDate, description });
            });
            if (experiences.length === 0) {
                experiences.push({
                    company: 'Tech Solutions Inc.',
                    title: 'Software Engineer',
                    startDate: 'Jan 2020',
                    endDate: 'Dec 2022',
                    description: 'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software.'
                });
            }

            // New: Education
            const education = [];
            document.querySelectorAll('.education-item').forEach(edu => {
                const institution = edu.querySelector('.education-institution').value || 'University Name';
                const degree = edu.querySelector('.education-degree').value || 'Degree Name';
                const graduationDate = edu.querySelector('.education-graduation-date').value || 'May 2019';
                const description = edu.querySelector('.education-description').value || 'Relevant coursework and projects.';
                education.push({ institution, degree, graduationDate, description });
            });
            if (education.length === 0) {
                education.push({
                    institution: 'University of Technology',
                    degree: 'B.Sc. in Computer Science',
                    graduationDate: 'May 2019',
                    description: 'Graduated with honors. Focused on web development and algorithms.'
                });
            }

            return {
                fullName, jobTitle, bio, location, email, phone, profilePic,
                skills, socialLinks, projects, experiences, education,
                selectedStructure // Include selected structure in data
            };
        };

        // Generate portfolio preview
        function generatePreview() {
            const previewContainer = document.getElementById('preview-wrapper');
            const placeholder = document.getElementById('preview-placeholder');

            // Only hide the placeholder if it exists (i.e., on the first run)
            if (placeholder) {
                placeholder.classList.add('hidden');
            }

            const data = getPortfolioData(); // Get all data in one go

            let html = '';
            if (selectedTheme === 'minimal') {
                html = generateMinimalTheme(data);
            } else if (selectedTheme === 'terminal') {
                html = generateTerminalTheme(data);
            } else if (selectedTheme === 'dark') {
                html = generateDarkTheme(data);
            } else if (selectedTheme === 'colorful') {
                html = generateColorfulTheme(data);
            } else if (selectedTheme === 'retro') {
                html = generateRetroTheme(data);
            } else if (selectedTheme === 'modern-gradient') {
                html = generateModernGradientTheme(data);
            } else if (selectedTheme === 'professional-clean') {
                html = generateProfessionalCleanTheme(data);
            }
            else {
                html = generateMinimalTheme(data); // Default
            }

            // Update preview
            previewContainer.innerHTML = html;
        }

        // Minimal theme generator
        function generateMinimalTheme(data) {
            const { fullName, jobTitle, bio, profilePic, skills, socialLinks, projects, email, phone, location, experiences, education, selectedStructure } = data;

            let sectionsHtml = '';

            // About Section
            if (selectedStructure === 'full' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="about" class="py-12 bg-gray-50">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">About Me</h2>
                            <div class="max-w-3xl mx-auto">
                                <p class="text-gray-600 mb-6">${bio}</p>
                                ${location ? `<p class="text-gray-600"><i class="fas fa-map-marker-alt mr-2 text-blue-600"></i> ${location}</p>` : ''}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Skills Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="skills" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">My Skills</h2>
                            <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                ${skills.map(skill => `
                                    <div class="skill-badge px-4 py-2 rounded-lg">${skill}</div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Experience Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="experience" class="py-12 bg-gray-50">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Work Experience</h2>
                            <div class="space-y-8">
                                ${experiences.map(exp => `
                                    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800">${exp.title} at ${exp.company}</h3>
                                        <p class="text-gray-500 text-sm mb-3">${exp.startDate} - ${exp.endDate}</p>
                                        <p class="text-gray-600">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Education Section
            if (selectedStructure === 'full') { // Only in full portfolio
                sectionsHtml += `
                    <section id="education" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Education</h2>
                            <div class="space-y-8">
                                ${education.map(edu => `
                                    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800">${edu.degree}</h3>
                                        <p class="text-gray-500 text-sm mb-3">${edu.institution} (${edu.graduationDate})</p>
                                        <p class="text-gray-600">${edu.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Projects Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="projects" class="py-12 bg-gray-50">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">My Projects</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                ${projects.map(project => `
                                    <div class="project-card bg-white p-6 rounded-lg border border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800 mb-2">${project.title}</h3>
                                        <p class="text-gray-600 mb-4">${project.description}</p>
                                        <div class="mb-4">
                                            <h4 class="text-sm font-semibold text-gray-700 mb-2">Technologies Used:</h4>
                                            <div class="flex flex-wrap gap-2">
                                                ${project.technologies.split(',').map(tech => `
                                                    <span class="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">${tech.trim()}</span>
                                                `).join('')}
                                            </div>
                                        </div>
                                        ${project.url && project.url !== '#' ? `<a href="${project.url}" class="text-blue-600 hover:underline flex items-center"><i class="fas fa-external-link-alt mr-2"></i> View Project</a>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Contact Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="contact" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Get In Touch</h2>
                            <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Contact Info</h3>
                                        <ul class="space-y-3">
                                            ${email ? `<li class="flex items-center"><i class="fas fa-envelope mr-3 text-blue-600"></i> ${email}</li>` : ''}
                                            ${phone ? `<li class="flex items-center"><i class="fas fa-phone mr-3 text-blue-600"></i> ${phone}</li>` : ''}
                                            ${location ? `<li class="flex items-center"><i class="fas fa-map-marker-alt mr-3 text-blue-600"></i> ${location}</p>` : ''}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Social Links</h3>
                                        <div class="flex space-x-4">
                                            ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="text-gray-700 hover:text-gray-900"><i class="fab fa-github text-2xl"></i></a>` : ''}
                                            ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="text-blue-700 hover:text-blue-900"><i class="fab fa-linkedin-in text-2xl"></i></a>` : ''}
                                            ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}" class="text-blue-400 hover:text-blue-600"><i class="fab fa-twitter text-2xl"></i></a>` : ''}
                                            ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}" class="text-pink-600 hover:text-pink-800"><i class="fab fa-instagram text-2xl"></i></a>` : ''}
                                            ${socialLinks.website && socialLinks.website !== '#' ? `<a href="${socialLinks.website}" class="text-gray-700 hover:text-gray-900"><i class="fas fa-globe text-2xl"></i></a>` : ''}
                                        </div>
                                    </div>
                                </div>
                                <form class="contact-form space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                        </div>
                                        <div>
                                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                            <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                        </div>
                                    </div>
                                    <div>
                                        <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <input type="text" id="subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                    </div>
                                    <div>
                                        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea id="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                                    </div>
                                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </section>
                `;
            }

            return `
                <div class="preview-portfolio w-full h-full overflow-y-auto">
                    <!-- Header -->
                    <header class="py-4">
                        <div class="container mx-auto px-6">
                            <div class="flex items-center justify-between">
                                <div class="text-xl font-bold text-gray-800">${fullName.split(' ')[0]}</div>
                                <nav class="hidden md:block">
                                    <ul class="flex space-x-8">
                                        <li><a href="#about" class="text-gray-600 hover:text-blue-600">About</a></li>
                                        <li><a href="#skills" class="text-gray-600 hover:text-blue-600">Skills</a></li>
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#experience" class="text-gray-600 hover:text-blue-600">Experience</a></li>` : ''}
                                        ${(selectedStructure === 'full') ? `<li><a href="#education" class="text-gray-600 hover:text-blue-600">Education</a></li>` : ''}
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#projects" class="text-gray-600 hover:text-blue-600">Projects</a></li>` : ''}
                                        <li><a href="#contact" class="text-gray-600 hover:text-blue-600">Contact</a></li>
                                    </ul>
                                </nav>
                                <button class="md:hidden text-gray-600">
                                    <i class="fas fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </header>

                    <!-- Hero Section -->
                    <section class="hero-section py-12 md:py-20">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row items-center">
                                <div class="md:w-1/2 mb-8 md:mb-0">
                                    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Hi, I'm ${fullName}</h1>
                                    <h2 class="text-2xl text-blue-600 mb-6">${jobTitle}</h2>
                                    <p class="text-gray-600 mb-8 max-w-lg">${bio}</p>
                                    <div class="flex space-x-4">
                                        ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-github mr-2"></i> GitHub</a>` : ''}
                                        ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-linkedin-in mr-2"></i> LinkedIn</a>` : ''}
                                    </div>
                                </div>
                                <div class="md:w-1/2 flex justify-center">
                                    <div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-100">
                                        <img src="${profilePic}" alt="${fullName}" class="w-full h-full object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    ${sectionsHtml}

                    <!-- Footer -->
                    <footer class="bg-gray-800 text-white py-8">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row justify-between items-center">
                                <div class="mb-4 md:mb-0">
                                    <h3 class="text-xl font-bold">${fullName}</h3>
                                    <p class="text-gray-400">${jobTitle}</p>
                                </div>
                                <div class="flex space-x-6">
                                    ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="text-gray-400 hover:text-white"><i class="fab fa-github text-xl"></i></a>` : ''}
                                    ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin-in text-xl"></i></a>` : ''}
                                    ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-xl"></i></a>` : ''}
                                    ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-xl"></i></a>` : ''}
                                </div>
                            </div>
                            <div class="mt-8 text-center text-gray-400 text-sm">
                                <p>&copy; ${new Date().getFullYear()} ${fullName}. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            `;
        }

        // Terminal theme generator
        function generateTerminalTheme(data) {
            const { fullName, jobTitle, bio, profilePic, skills, socialLinks, projects, email, phone, location, experiences, education, selectedStructure } = data;

            let sectionsHtml = '';

            // About Section
            if (selectedStructure === 'full' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold mb-4">$ <span class="command">about</span></h2>
                        <p class="mb-4">${bio}</p>
                        ${location ? `<p class="mb-2"><span class="command">location</span>: ${location}</p>` : ''}
                    </div>
                `;
            }

            // Skills Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold mb-4">$ <span class="command">skills</span></h2>
                        <div class="flex flex-wrap gap-2">
                            ${skills.map(skill => `
                                <div class="skill px-3 py-1 rounded">${skill}</div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Experience Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold mb-4">$ <span class="command">experience</span></h2>
                        <div class="space-y-4">
                            ${experiences.map(exp => `
                                <div class="project p-4 rounded mb-3">
                                    <h3 class="text-xl font-bold text-yellow-300">${exp.title} at ${exp.company}</h3>
                                    <p class="text-sm mb-2">${exp.startDate} - ${exp.endDate}</p>
                                    <p>${exp.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Education Section
            if (selectedStructure === 'full') {
                sectionsHtml += `
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold mb-4">$ <span class="command">education</span></h2>
                        <div class="space-y-4">
                            ${education.map(edu => `
                                <div class="project p-4 rounded mb-3">
                                    <h3 class="text-xl font-bold text-yellow-300">${edu.degree}</h3>
                                    <p class="text-sm mb-2">${edu.institution} (${edu.graduationDate})</p>
                                    <p>${edu.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Projects Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold mb-4">$ <span class="command">projects</span></h2>
                        <div class="space-y-4">
                            ${projects.map(project => `
                                <div class="project p-4 rounded mb-3">
                                    <h3 class="text-xl font-bold text-yellow-300 mb-2">${project.title}</h3>
                                    <p class="mb-3">${project.description}</p>
                                    <p><span class="command">tech</span>: ${project.technologies}</p>
                                    ${project.url && project.url !== '#' ? `<p><span class="command">url</span>: <a href="${project.url}" target="_blank">${project.url}</a></p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Contact Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <div>
                        <h2 class="text-2xl font-bold mb-4">$ <span class="command">contact</span></h2>
                        <div class="mb-4">
                            ${email ? `<p><span class="command">email</span>: <a href="mailto:${email}">${email}</a></p>` : ''}
                            ${phone ? `<p><span class="command">phone</span>: ${phone}</p>` : ''}
                        </div>
                        <div class="mb-6">
                            <h3 class="text-xl font-bold mb-2">$ <span class="command">social</span></h3>
                            <div class="flex space-x-4">
                                ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" target="_blank"><i class="fab fa-github text-2xl"></i></a>` : ''}
                                ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" target="_blank"><i class="fab fa-linkedin-in text-2xl"></i></a>` : ''}
                                ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}" target="_blank"><i class="fab fa-twitter text-2xl"></i></a>` : ''}
                                ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}" target="_blank"><i class="fab fa-instagram text-2xl"></i></a>` : ''}
                            </div>
                        </div>
                        <form class="contact-form space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="name" class="block text-sm font-medium mb-1">Your Name</label>
                                    <input type="text" id="name" class="w-full px-4 py-2 border rounded-lg">
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium mb-1">Your Email</label>
                                    <input type="email" id="email" class="w-full px-4 py-2 border rounded-lg">
                                </div>
                            </div>
                            <div>
                                <label for="subject" class="block text-sm font-medium mb-1">Subject</label>
                                <input type="text" id="subject" class="w-full px-4 py-2 border rounded-lg">
                            </div>
                            <div>
                                <label for="message" class="block text-sm font-medium mb-1">Message</label>
                                <textarea id="message" rows="4" class="w-full px-4 py-2 border rounded-lg"></textarea>
                            </div>
                            <button type="submit" class="px-6 py-3 rounded-lg">Send Message</button>
                        </form>
                    </div>
                `;
            }

            return `
                <div class="terminal-theme-portfolio w-full h-full overflow-y-auto p-4">
                    <!-- Header -->
                    <div class="header mb-6">
                        <h1 class="text-3xl font-bold">${fullName}</h1>
                        <h2 class="text-xl text-green-400">${jobTitle}</h2>
                    </div>

                    ${sectionsHtml}

                    <!-- Footer -->
                    <footer class="mt-8 pt-4 border-t border-green-500 text-sm">
                        <p class="comment">// ${fullName} Portfolio - &copy; ${new Date().getFullYear()}</p>
                    </footer>
                </div>
            `;
        }

        // Dark theme generator
        function generateDarkTheme(data) {
            const { fullName, jobTitle, bio, profilePic, skills, socialLinks, projects, email, phone, location, experiences, education, selectedStructure } = data;

            let sectionsHtml = '';

            // About Section
            if (selectedStructure === 'full' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="about" class="py-12 section">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center">About Me</h2>
                            <div class="max-w-3xl mx-auto">
                                <p class="mb-6">${bio}</p>
                                ${location ? `<p><i class="fas fa-map-marker-alt mr-2 text-blue-400"></i> ${location}</p>` : ''}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Skills Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="skills" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center">My Skills</h2>
                            <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                ${skills.map(skill => `
                                    <div class="skill-badge px-4 py-2 rounded-lg">${skill}</div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Experience Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="experience" class="py-12 section">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center">Work Experience</h2>
                            <div class="space-y-8">
                                ${experiences.map(exp => `
                                    <div class="bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600">
                                        <h3 class="text-xl font-bold">${exp.title} at ${exp.company}</h3>
                                        <p class="text-gray-400 text-sm mb-3">${exp.startDate} - ${exp.endDate}</p>
                                        <p class="text-gray-300">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Education Section
            if (selectedStructure === 'full') {
                sectionsHtml += `
                    <section id="education" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center">Education</h2>
                            <div class="space-y-8">
                                ${education.map(edu => `
                                    <div class="bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600">
                                        <h3 class="text-xl font-bold">${edu.degree}</h3>
                                        <p class="text-gray-400 text-sm mb-3">${edu.institution} (${edu.graduationDate})</p>
                                        <p class="text-gray-300">${edu.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Projects Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="projects" class="py-12 section">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center">My Projects</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                ${projects.map(project => `
                                    <div class="project-card p-6 rounded-lg">
                                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                                        <p class="mb-4">${project.description}</p>
                                        <div class="mb-4">
                                            <h4 class="text-sm font-semibold mb-2">Technologies Used:</h4>
                                            <div class="flex flex-wrap gap-2">
                                                ${project.technologies.split(',').map(tech => `
                                                    <span class="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">${tech.trim()}</span>
                                                `).join('')}
                                            </div>
                                        </div>
                                        ${project.url && project.url !== '#' ? `<a href="${project.url}" class="text-blue-400 hover:underline flex items-center"><i class="fas fa-external-link-alt mr-2"></i> View Project</a>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Contact Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="contact" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
                            <div class="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h3 class="text-xl font-semibold mb-4">Contact Info</h3>
                                        <ul class="space-y-3">
                                            ${email ? `<li class="flex items-center"><i class="fas fa-envelope mr-3 text-blue-400"></i> ${email}</li>` : ''}
                                            ${phone ? `<li class="flex items-center"><i class="fas fa-phone mr-3 text-blue-400"></i> ${phone}</li>` : ''}
                                            ${location ? `<li class="flex items-center"><i class="fas fa-map-marker-alt mr-3 text-blue-400"></i> ${location}</p>` : ''}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-semibold mb-4">Social Links</h3>
                                        <div class="flex space-x-4">
                                            ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}"><i class="fab fa-github text-2xl"></i></a>` : ''}
                                            ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}"><i class="fab fa-linkedin-in text-2xl"></i></a>` : ''}
                                            ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}"><i class="fab fa-twitter text-2xl"></i></a>` : ''}
                                            ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}"><i class="fab fa-instagram text-2xl"></i></a>` : ''}
                                            ${socialLinks.website && socialLinks.website !== '#' ? `<a href="${socialLinks.website}"><i class="fas fa-globe text-2xl"></i></a>` : ''}
                                        </div>
                                    </div>
                                </div>
                                <form class="contact-form space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label for="name" class="block text-sm font-medium mb-1">Your Name</label>
                                            <input type="text" id="name" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                        </div>
                                        <div>
                                            <label for="email" class="block text-sm font-medium mb-1">Your Email</label>
                                            <input type="email" id="email" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                        </div>
                                    </div>
                                    <div>
                                        <label for="subject" class="block text-sm font-medium mb-1">Subject</label>
                                        <input type="text" id="subject" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                    </div>
                                    <div>
                                        <label for="message" class="block text-sm font-medium mb-1">Message</label>
                                        <textarea id="message" rows="4" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                                    </div>
                                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </section>
                `;
            }

            return `
                <div class="dark-theme-portfolio w-full h-full overflow-y-auto">
                    <!-- Header -->
                    <header class="py-4 header">
                        <div class="container mx-auto px-6">
                            <div class="flex items-center justify-between">
                                <div class="text-xl font-bold">${fullName.split(' ')[0]}</div>
                                <nav class="hidden md:block">
                                    <ul class="flex space-x-8">
                                        <li><a href="#about">About</a></li>
                                        <li><a href="#skills">Skills</a></li>
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#experience">Experience</a></li>` : ''}
                                        ${(selectedStructure === 'full') ? `<li><a href="#education">Education</a></li>` : ''}
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#projects">Projects</a></li>` : ''}
                                        <li><a href="#contact">Contact</a></li>
                                    </ul>
                                </nav>
                                <button class="md:hidden">
                                    <i class="fas fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </header>

                    <!-- Hero Section -->
                    <section class="hero-section py-12 md:py-20">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row items-center">
                                <div class="md:w-1/2 mb-8 md:mb-0">
                                    <h1 class="text-4xl md:text-5xl font-bold mb-4">Hi, I'm ${fullName}</h1>
                                    <h2 class="text-2xl text-blue-400 mb-6">${jobTitle}</h2>
                                    <p class="mb-8 max-w-lg">${bio}</p>
                                    <div class="flex space-x-4">
                                        ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-github mr-2"></i> GitHub</a>` : ''}
                                        ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-linkedin-in mr-2"></i> LinkedIn</a>` : ''}
                                    </div>
                                </div>
                                <div class="md:w-1/2 flex justify-center">
                                    <div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-900">
                                        <img src="${profilePic}" alt="${fullName}" class="w-full h-full object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    ${sectionsHtml}

                    <!-- Footer -->
                    <footer class="bg-gray-900 py-8">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row justify-between items-center">
                                <div class="mb-4 md:mb-0">
                                    <h3 class="text-xl font-bold">${fullName}</h3>
                                    <p class="text-gray-400">${jobTitle}</p>
                                </div>
                                <div class="flex space-x-6">
                                    ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}"><i class="fab fa-github text-xl"></i></a>` : ''}
                                    ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}"><i class="fab fa-linkedin-in text-xl"></i></a>` : ''}
                                    ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}"><i class="fab fa-twitter text-xl"></i></a>` : ''}
                                    ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}"><i class="fab fa-instagram text-xl"></i></a>` : ''}
                                </div>
                            </div>
                            <div class="mt-8 text-center text-gray-500 text-sm">
                                <p>&copy; ${new Date().getFullYear()} ${fullName}. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            `;
        }

        // Colorful theme generator
        function generateColorfulTheme(data) {
            const { fullName, jobTitle, bio, profilePic, skills, socialLinks, projects, email, phone, location, experiences, education, selectedStructure } = data;

            let sectionsHtml = '';

            // About Section
            if (selectedStructure === 'full' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="about" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">About Me</h2>
                            <div class="max-w-3xl mx-auto">
                                <p class="mb-6">${bio}</p>
                                ${location ? `<p><i class="fas fa-map-marker-alt mr-2 text-indigo-600"></i> ${location}</p>` : ''}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Skills Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="skills" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">My Skills</h2>
                            <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                ${skills.map(skill => `
                                    <div class="skill-badge px-4 py-2 rounded-lg">${skill}</div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Experience Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="experience" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">Work Experience</h2>
                            <div class="space-y-8">
                                ${experiences.map(exp => `
                                    <div class="bg-white p-6 rounded-lg shadow-md border border-indigo-200">
                                        <h3 class="text-xl font-bold">${exp.title} at ${exp.company}</h3>
                                        <p class="text-gray-600 text-sm mb-3">${exp.startDate} - ${exp.endDate}</p>
                                        <p class="text-gray-700">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Education Section
            if (selectedStructure === 'full') {
                sectionsHtml += `
                    <section id="education" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">Education</h2>
                            <div class="space-y-8">
                                ${education.map(edu => `
                                    <div class="bg-white p-6 rounded-lg shadow-md border border-indigo-200">
                                        <h3 class="text-xl font-bold">${edu.degree}</h3>
                                        <p class="text-gray-600 text-sm mb-3">${edu.institution} (${edu.graduationDate})</p>
                                        <p class="text-gray-700">${edu.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Projects Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="projects" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">My Projects</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                ${projects.map(project => `
                                    <div class="project-card p-6 rounded-lg">
                                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                                        <p class="mb-4">${project.description}</p>
                                        <div class="mb-4">
                                            <h4 class="text-sm font-semibold mb-2">Technologies Used:</h4>
                                            <div class="flex flex-wrap gap-2">
                                                ${project.technologies.split(',').map(tech => `
                                                    <span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">${tech.trim()}</span>
                                                `).join('')}
                                            </div>
                                        </div>
                                        ${project.url && project.url !== '#' ? `<a href="${project.url}" class="text-indigo-600 hover:underline flex items-center"><i class="fas fa-external-link-alt mr-2"></i> View Project</a>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Contact Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="contact" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">Get In Touch</h2>
                            <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-indigo-200">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h3 class="text-xl font-semibold mb-4">Contact Info</h3>
                                        <ul class="space-y-3">
                                            ${email ? `<li class="flex items-center"><i class="fas fa-envelope mr-3 text-indigo-600"></i> ${email}</li>` : ''}
                                            ${phone ? `<li class="flex items-center"><i class="fas fa-phone mr-3 text-indigo-600"></i> ${phone}</li>` : ''}
                                            ${location ? `<li class="flex items-center"><i class="fas fa-map-marker-alt mr-3 text-indigo-600"></i> ${location}</p>` : ''}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-semibold mb-4">Social Links</h3>
                                        <div class="flex space-x-4">
                                            ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}"><i class="fab fa-github text-2xl text-gray-700"></i></a>` : ''}
                                            ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}"><i class="fab fa-linkedin-in text-2xl text-blue-700"></i></a>` : ''}
                                            ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}"><i class="fab fa-twitter text-2xl text-blue-400"></i></a>` : ''}
                                            ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}"><i class="fab fa-instagram text-2xl text-pink-600"></i></a>` : ''}
                                            ${socialLinks.website && socialLinks.website !== '#' ? `<a href="${socialLinks.website}"><i class="fas fa-globe text-2xl text-gray-700"></i></a>` : ''}
                                        </div>
                                    </div>
                                </div>
                                <form class="contact-form space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label for="name" class="block text-sm font-medium mb-1">Your Name</label>
                                            <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                                        </div>
                                        <div>
                                            <label for="email" class="block text-sm font-medium mb-1">Your Email</label>
                                            <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                                        </div>
                                    </div>
                                    <div>
                                        <label for="subject" class="block text-sm font-medium mb-1">Subject</label>
                                        <input type="text" id="subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                                    </div>
                                    <div>
                                        <label for="message" class="block text-sm font-medium mb-1">Message</label>
                                        <textarea id="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                                    </div>
                                    <button type="submit" class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </section>
                `;
            }

            return `
                <div class="colorful-theme-portfolio w-full h-full overflow-y-auto">
                    <!-- Header -->
                    <header class="py-4 header">
                        <div class="container mx-auto px-6">
                            <div class="flex items-center justify-between">
                                <div class="text-xl font-bold">${fullName.split(' ')[0]}</div>
                                <nav class="hidden md:block">
                                    <ul class="flex space-x-8">
                                        <li><a href="#about">About</a></li>
                                        <li><a href="#skills">Skills</a></li>
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#experience">Experience</a></li>` : ''}
                                        ${(selectedStructure === 'full') ? `<li><a href="#education">Education</a></li>` : ''}
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#projects">Projects</a></li>` : ''}
                                        <li><a href="#contact">Contact</a></li>
                                    </ul>
                                </nav>
                                <button class="md:hidden">
                                    <i class="fas fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </header>

                    <!-- Hero Section -->
                    <section class="hero-section py-12 md:py-20">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row items-center">
                                <div class="md:w-1/2 mb-8 md:mb-0">
                                    <h1 class="text-4xl md:text-5xl font-bold mb-4">Hi, I'm ${fullName}</h1>
                                    <h2 class="text-2xl text-purple-800 mb-6">${jobTitle}</h2>
                                    <p class="mb-8 max-w-lg">${bio}</p>
                                    <div class="flex space-x-4">
                                        ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-github mr-2"></i> GitHub</a>` : ''}
                                        ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-linkedin-in mr-2"></i> LinkedIn</a>` : ''}
                                    </div>
                                </div>
                                <div class="md:w-1/2 flex justify-center">
                                    <div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-indigo-200">
                                        <img src="${profilePic}" alt="${fullName}" class="w-full h-full object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    ${sectionsHtml}

                    <!-- Footer -->
                    <footer class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row justify-between items-center">
                                <div class="mb-4 md:mb-0">
                                    <h3 class="text-xl font-bold">${fullName}</h3>
                                    <p>${jobTitle}</p>
                                </div>
                                <div class="flex space-x-6">
                                    ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}"><i class="fab fa-github text-xl"></i></a>` : ''}
                                    ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}"><i class="fab fa-linkedin-in text-xl"></i></a>` : ''}
                                    ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}"><i class="fab fa-twitter text-xl"></i></a>` : ''}
                                    ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}"><i class="fab fa-instagram text-xl"></i></a>` : ''}
                                </div>
                            </div>
                            <div class="mt-8 text-center text-indigo-200 text-sm">
                                <p>&copy; ${new Date().getFullYear()} ${fullName}. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            `;
        }

        // Retro theme generator
        function generateRetroTheme(data) {
            const { fullName, jobTitle, bio, profilePic, skills, socialLinks, projects, email, phone, location, experiences, education, selectedStructure } = data;

            let sectionsHtml = '';

            // About Section
            if (selectedStructure === 'full' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="about" class="py-12 bg-gray-900">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">ABOUT ME</h2>
                            <div class="max-w-3xl mx-auto">
                                <p class="mb-6">${bio}</p>
                                ${location ? `<p><i class="fas fa-map-marker-alt mr-2 text-pink-400"></i> ${location.toUpperCase()}</p>` : ''}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Skills Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="skills" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">MY SKILLS</h2>
                            <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                ${skills.map(skill => `
                                    <div class="skill-badge px-4 py-2 rounded-lg">${skill.toUpperCase()}</div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Experience Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="experience" class="py-12 bg-gray-900">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">WORK EXPERIENCE</h2>
                            <div class="space-y-8">
                                ${experiences.map(exp => `
                                    <div class="bg-gray-800 p-6 rounded-lg shadow-md border border-pink-400">
                                        <h3 class="text-xl font-bold text-yellow-300">${exp.title.toUpperCase()} AT ${exp.company.toUpperCase()}</h3>
                                        <p class="text-sm mb-3">${exp.startDate.toUpperCase()} - ${exp.endDate.toUpperCase()}</p>
                                        <p>${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Education Section
            if (selectedStructure === 'full') {
                sectionsHtml += `
                    <section id="education" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">EDUCATION</h2>
                            <div class="space-y-8">
                                ${education.map(edu => `
                                    <div class="bg-gray-800 p-6 rounded-lg shadow-md border border-pink-400">
                                        <h3 class="text-xl font-bold text-yellow-300">${edu.degree.toUpperCase()}</h3>
                                        <p class="text-sm mb-3">${edu.institution.toUpperCase()} (${edu.graduationDate.toUpperCase()})</p>
                                        <p>${edu.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Projects Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="projects" class="py-12 bg-gray-900">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">MY PROJECTS</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                ${projects.map(project => `
                                    <div class="project-card p-6 rounded-lg">
                                        <h3 class="text-xl font-bold text-yellow-300 mb-2">${project.title.toUpperCase()}</h3>
                                        <p class="mb-4">${project.description}</p>
                                        <div class="mb-4">
                                            <h4 class="text-sm font-semibold mb-2">TECHNOLOGIES USED:</h4>
                                            <div class="flex flex-wrap gap-2">
                                                ${project.technologies.split(',').map(tech => `
                                                    <span class="bg-gray-700 text-pink-400 text-xs px-2 py-1 rounded">${tech.trim().toUpperCase()}</span>
                                                `).join('')}
                                            </div>
                                        </div>
                                        ${project.url && project.url !== '#' ? `<a href="${project.url}" class="text-pink-400 hover:underline flex items-center"><i class="fas fa-external-link-alt mr-2"></i> VIEW PROJECT</a>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Contact Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="contact" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold mb-8 text-center section-title">GET IN TOUCH</h2>
                            <div class="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md border border-pink-400">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h3 class="text-xl font-semibold text-yellow-300 mb-4">CONTACT INFO</h3>
                                        <ul class="space-y-3">
                                            ${email ? `<li class="flex items-center"><i class="fas fa-envelope mr-3 text-pink-400"></i> ${email.toUpperCase()}</li>` : ''}
                                            ${phone ? `<li class="flex items-center"><i class="fas fa-phone mr-3 text-pink-400"></i> ${phone.toUpperCase()}</li>` : ''}
                                            ${location ? `<li class="flex items-center"><i class="fas fa-map-marker-alt mr-3 text-pink-400"></i> ${location.toUpperCase()}</p>` : ''}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-semibold text-yellow-300 mb-4">SOCIAL LINKS</h3>
                                        <div class="flex space-x-4">
                                            ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}"><i class="fab fa-github text-2xl text-pink-400"></i></a>` : ''}
                                            ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}"><i class="fab fa-linkedin-in text-2xl text-pink-400"></i></a>` : ''}
                                            ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}"><i class="fab fa-twitter text-2xl text-pink-400"></i></a>` : ''}
                                            ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}"><i class="fab fa-instagram text-2xl text-pink-400"></i></a>` : ''}
                                            ${socialLinks.website && socialLinks.website !== '#' ? `<a href="${socialLinks.website}"><i class="fas fa-globe text-2xl text-pink-400"></i></a>` : ''}
                                        </div>
                                    </div>
                                </div>
                                <form class="contact-form space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label for="name" class="block text-sm font-medium mb-1">YOUR NAME</label>
                                            <input type="text" id="name" class="w-full px-4 py-2 bg-gray-900 border border-pink-400 rounded-lg focus:ring-pink-500 focus:border-pink-500">
                                        </div>
                                        <div>
                                            <label for="email" class="block text-sm font-medium mb-1">YOUR EMAIL</label>
                                            <input type="email" id="email" class="w-full px-4 py-2 bg-gray-900 border border-pink-400 rounded-lg focus:ring-pink-500 focus:border-pink-500">
                                        </div>
                                    </div>
                                    <div>
                                        <label for="subject" class="block text-sm font-medium mb-1">SUBJECT</label>
                                        <input type="text" id="subject" class="w-full px-4 py-2 bg-gray-900 border border-pink-400 rounded-lg focus:ring-pink-500 focus:border-pink-500">
                                    </div>
                                    <div>
                                        <label for="message" class="block text-sm font-medium mb-1">MESSAGE</label>
                                        <textarea id="message" rows="4" class="w-full px-4 py-2 bg-gray-900 border border-pink-400 rounded-lg focus:ring-pink-500 focus:border-pink-500"></textarea>
                                    </div>
                                    <button type="submit" class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg">SEND MESSAGE</button>
                                </form>
                            </div>
                        </div>
                    </section>
                `;
            }

            return `
                <div class="retro-theme-portfolio w-full h-full overflow-y-auto">
                    <!-- Header -->
                    <header class="py-4 header">
                        <div class="container mx-auto px-6">
                            <div class="flex items-center justify-between">
                                <div class="text-xl font-bold">${fullName.split(' ')[0]}</div>
                                <nav class="hidden md:block">
                                    <ul class="flex space-x-8">
                                        <li><a href="#about">About</a></li>
                                        <li><a href="#skills">Skills</a></li>
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#experience">Experience</a></li>` : ''}
                                        ${(selectedStructure === 'full') ? `<li><a href="#education">Education</a></li>` : ''}
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#projects">Projects</a></li>` : ''}
                                        <li><a href="#contact">Contact</a></li>
                                    </ul>
                                </nav>
                                <button class="md:hidden">
                                    <i class="fas fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </header>

                    <!-- Hero Section -->
                    <section class="hero-section py-12 md:py-20">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row items-center">
                                <div class="md:w-1/2 mb-8 md:mb-0">
                                    <h1 class="text-4xl md:text-5xl font-bold mb-4">HI, I'M ${fullName.toUpperCase()}</h1>
                                    <h2 class="text-2xl text-pink-400 mb-6">${jobTitle.toUpperCase()}</h2>
                                    <p class="mb-8 max-w-lg">${bio}</p>
                                    <div class="flex space-x-4">
                                        ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-github mr-2"></i> GITHUB</a>` : ''}
                                        ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-linkedin-in mr-2"></i> LINKEDIN</a>` : ''}
                                    </div>
                                </div>
                                <div class="md:w-1/2 flex justify-center">
                                    <div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-pink-400">
                                        <img src="${profilePic}" alt="${fullName}" class="w-full h-full object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    ${sectionsHtml}

                    <!-- Footer -->
                    <footer class="bg-gray-900 text-white py-8">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row justify-between items-center">
                                <div class="mb-4 md:mb-0">
                                    <h3 class="text-xl font-bold">${fullName.toUpperCase()}</h3>
                                    <p>${jobTitle.toUpperCase()}</p>
                                </div>
                                <div class="flex space-x-6">
                                    ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}"><i class="fab fa-github text-xl"></i></a>` : ''}
                                    ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}"><i class="fab fa-linkedin-in text-xl"></i></a>` : ''}
                                    ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}"><i class="fab fa-twitter text-xl"></i></a>` : ''}
                                    ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}"><i class="fab fa-instagram text-xl"></i></a>` : ''}
                                </div>
                            </div>
                            <div class="mt-8 text-center text-gray-500 text-sm">
                                <p>&copy; ${new Date().getFullYear()} ${fullName.toUpperCase()}. ALL RIGHTS RESERVED.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            `;
        }

        // Modern Gradient theme generator
        function generateModernGradientTheme(data) {
            const { fullName, jobTitle, bio, profilePic, skills, socialLinks, projects, email, phone, location, experiences, education, selectedStructure } = data;

            let sectionsHtml = '';

            // About Section
            if (selectedStructure === 'full' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="about" class="py-12 bg-white rounded-lg shadow-md mb-8">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">About Me</h2>
                            <div class="max-w-3xl mx-auto">
                                <p class="text-gray-700 mb-6">${bio}</p>
                                ${location ? `<p class="text-gray-700"><i class="fas fa-map-marker-alt mr-2 text-purple-600"></i> ${location}</p>` : ''}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Skills Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="skills" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">My Skills</h2>
                            <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                ${skills.map(skill => `
                                    <div class="skill-badge px-4 py-2 rounded-lg">${skill}</div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Experience Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="experience" class="py-12 bg-white rounded-lg shadow-md mb-8">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Work Experience</h2>
                            <div class="space-y-8">
                                ${experiences.map(exp => `
                                    <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800">${exp.title} at ${exp.company}</h3>
                                        <p class="text-gray-600 text-sm mb-3">${exp.startDate} - ${exp.endDate}</p>
                                        <p class="text-gray-700">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Education Section
            if (selectedStructure === 'full') {
                sectionsHtml += `
                    <section id="education" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Education</h2>
                            <div class="space-y-8">
                                ${education.map(edu => `
                                    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800">${edu.degree}</h3>
                                        <p class="text-gray-600 text-sm mb-3">${edu.institution} (${edu.graduationDate})</p>
                                        <p class="text-gray-700">${edu.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Projects Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="projects" class="py-12 bg-white rounded-lg shadow-md mb-8">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">My Projects</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                ${projects.map(project => `
                                    <div class="project-card p-6 rounded-lg">
                                        <h3 class="text-xl font-bold text-gray-800 mb-2">${project.title}</h3>
                                        <p class="text-gray-700 mb-4">${project.description}</p>
                                        <div class="mb-4">
                                            <h4 class="text-sm font-semibold text-gray-700 mb-2">Technologies Used:</h4>
                                            <div class="flex flex-wrap gap-2">
                                                ${project.technologies.split(',').map(tech => `
                                                    <span class="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">${tech.trim()}</span>
                                                `).join('')}
                                            </div>
                                        </div>
                                        ${project.url && project.url !== '#' ? `<a href="${project.url}" class="text-purple-600 hover:underline flex items-center"><i class="fas fa-external-link-alt mr-2"></i> View Project</a>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Contact Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="contact" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Get In Touch</h2>
                            <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Contact Info</h3>
                                        <ul class="space-y-3">
                                            ${email ? `<li class="flex items-center"><i class="fas fa-envelope mr-3 text-purple-600"></i> ${email}</li>` : ''}
                                            ${phone ? `<li class="flex items-center"><i class="fas fa-phone mr-3 text-purple-600"></i> ${phone}</li>` : ''}
                                            ${location ? `<li class="flex items-center"><i class="fas fa-map-marker-alt mr-3 text-purple-600"></i> ${location}</p>` : ''}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Social Links</h3>
                                        <div class="flex space-x-4">
                                            ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="text-gray-700 hover:text-gray-900"><i class="fab fa-github text-2xl"></i></a>` : ''}
                                            ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="text-blue-700 hover:text-blue-900"><i class="fab fa-linkedin-in text-2xl"></i></a>` : ''}
                                            ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}" class="text-blue-400 hover:text-blue-600"><i class="fab fa-twitter text-2xl"></i></a>` : ''}
                                            ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}" class="text-pink-600 hover:text-pink-800"><i class="fab fa-instagram text-2xl"></i></a>` : ''}
                                            ${socialLinks.website && socialLinks.website !== '#' ? `<a href="${socialLinks.website}" class="text-gray-700 hover:text-gray-900"><i class="fas fa-globe text-2xl"></i></a>` : ''}
                                        </div>
                                    </div>
                                </div>
                                <form class="contact-form space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500">
                                        </div>
                                        <div>
                                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                            <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500">
                                        </div>
                                    </div>
                                    <div>
                                        <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <input type="text" id="subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500">
                                    </div>
                                    <div>
                                        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea id="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"></textarea>
                                    </div>
                                    <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </section>
                `;
            }

            return `
                <div class="modern-gradient-portfolio w-full h-full overflow-y-auto">
                    <!-- Header -->
                    <header class="py-4 header">
                        <div class="container mx-auto px-6">
                            <div class="flex items-center justify-between">
                                <div class="text-xl font-bold">${fullName.split(' ')[0]}</div>
                                <nav class="hidden md:block">
                                    <ul class="flex space-x-8">
                                        <li><a href="#about">About</a></li>
                                        <li><a href="#skills">Skills</a></li>
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#experience">Experience</a></li>` : ''}
                                        ${(selectedStructure === 'full') ? `<li><a href="#education">Education</a></li>` : ''}
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#projects">Projects</a></li>` : ''}
                                        <li><a href="#contact">Contact</a></li>
                                    </ul>
                                </nav>
                                <button class="md:hidden">
                                    <i class="fas fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </header>

                    <!-- Hero Section -->
                    <section class="hero-section py-12 md:py-20">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row items-center">
                                <div class="md:w-1/2 mb-8 md:mb-0">
                                    <h1 class="text-4xl md:text-5xl font-bold mb-4">Hello, I'm <span class="text-yellow-200">${fullName}</span></h1>
                                    <h2 class="text-2xl text-pink-200 mb-6">${jobTitle}</h2>
                                    <p class="mb-8 max-w-lg">${bio}</p>
                                    <div class="flex space-x-4">
                                        ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-github mr-2"></i> GitHub</a>` : ''}
                                        ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-linkedin-in mr-2"></i> LinkedIn</a>` : ''}
                                    </div>
                                </div>
                                <div class="md:w-1/2 flex justify-center">
                                    <div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-yellow-300">
                                        <img src="${profilePic}" alt="${fullName}" class="w-full h-full object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    ${sectionsHtml}

                    <!-- Footer -->
                    <footer class="py-8 footer">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row justify-between items-center">
                                <div class="mb-4 md:mb-0">
                                    <h3 class="text-xl font-bold">${fullName}</h3>
                                    <p>${jobTitle}</p>
                                </div>
                                <div class="flex space-x-6">
                                    ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}"><i class="fab fa-github text-xl"></i></a>` : ''}
                                    ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}"><i class="fab fa-linkedin-in text-xl"></i></a>` : ''}
                                    ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}"><i class="fab fa-twitter text-xl"></i></a>` : ''}
                                    ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}"><i class="fab fa-instagram text-xl"></i></a>` : ''}
                                </div>
                            </div>
                            <div class="mt-8 text-center text-gray-200 text-sm">
                                <p>&copy; ${new Date().getFullYear()} ${fullName}. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            `;
        }

        // Professional Clean theme generator
        function generateProfessionalCleanTheme(data) {
            const { fullName, jobTitle, bio, profilePic, skills, socialLinks, projects, email, phone, location, experiences, education, selectedStructure } = data;

            let sectionsHtml = '';

            // About Section
            if (selectedStructure === 'full' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="about" class="py-12 bg-white rounded-lg shadow-sm mb-8">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">About Me</h2>
                            <div class="max-w-3xl mx-auto">
                                <p class="text-gray-700 mb-6">${bio}</p>
                                ${location ? `<p class="text-gray-700"><i class="fas fa-map-marker-alt mr-2 text-blue-600"></i> ${location}</p>` : ''}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Skills Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="skills" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">My Skills</h2>
                            <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                ${skills.map(skill => `
                                    <div class="skill-badge px-4 py-2 rounded-lg">${skill}</div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Experience Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="experience" class="py-12 bg-white rounded-lg shadow-sm mb-8">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Work Experience</h2>
                            <div class="space-y-8">
                                ${experiences.map(exp => `
                                    <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800">${exp.title} at ${exp.company}</h3>
                                        <p class="text-gray-600 text-sm mb-3">${exp.startDate} - ${exp.endDate}</p>
                                        <p class="text-gray-700">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Education Section
            if (selectedStructure === 'full') {
                sectionsHtml += `
                    <section id="education" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Education</h2>
                            <div class="space-y-8">
                                ${education.map(edu => `
                                    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                        <h3 class="text-xl font-bold text-gray-800">${edu.degree}</h3>
                                        <p class="text-gray-600 text-sm mb-3">${edu.institution} (${edu.graduationDate})</p>
                                        <p class="text-gray-700">${edu.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Projects Section
            if (selectedStructure === 'full' || selectedStructure === 'developer') {
                sectionsHtml += `
                    <section id="projects" class="py-12 bg-white rounded-lg shadow-sm mb-8">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">My Projects</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                ${projects.map(project => `
                                    <div class="project-card p-6 rounded-lg">
                                        <h3 class="text-xl font-bold text-gray-800 mb-2">${project.title}</h3>
                                        <p class="text-gray-700 mb-4">${project.description}</p>
                                        <div class="mb-4">
                                            <h4 class="text-sm font-semibold text-gray-700 mb-2">Technologies Used:</h4>
                                            <div class="flex flex-wrap gap-2">
                                                ${project.technologies.split(',').map(tech => `
                                                    <span class="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">${tech.trim()}</span>
                                                `).join('')}
                                            </div>
                                        </div>
                                        ${project.url && project.url !== '#' ? `<a href="${project.url}" class="text-blue-600 hover:underline flex items-center"><i class="fas fa-external-link-alt mr-2"></i> View Project</a>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
            }

            // Contact Section
            if (selectedStructure === 'full' || selectedStructure === 'developer' || selectedStructure === 'compact') {
                sectionsHtml += `
                    <section id="contact" class="py-12">
                        <div class="container mx-auto px-6">
                            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center section-title">Get In Touch</h2>
                            <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Contact Info</h3>
                                        <ul class="space-y-3">
                                            ${email ? `<li class="flex items-center"><i class="fas fa-envelope mr-3 text-blue-600"></i> ${email}</li>` : ''}
                                            ${phone ? `<li class="flex items-center"><i class="fas fa-phone mr-3 text-blue-600"></i> ${phone}</li>` : ''}
                                            ${location ? `<li class="flex items-center"><i class="fas fa-map-marker-alt mr-3 text-blue-600"></i> ${location}</p>` : ''}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-800 mb-4">Social Links</h3>
                                        <div class="flex space-x-4">
                                            ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="text-gray-700 hover:text-gray-900"><i class="fab fa-github text-2xl"></i></a>` : ''}
                                            ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="text-blue-700 hover:text-blue-900"><i class="fab fa-linkedin-in text-2xl"></i></a>` : ''}
                                            ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}" class="text-blue-400 hover:text-blue-600"><i class="fab fa-twitter text-2xl"></i></a>` : ''}
                                            ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}" class="text-pink-600 hover:text-pink-800"><i class="fab fa-instagram text-2xl"></i></a>` : ''}
                                            ${socialLinks.website && socialLinks.website !== '#' ? `<a href="${socialLinks.website}" class="text-gray-700 hover:text-gray-900"><i class="fas fa-globe text-2xl"></i></a>` : ''}
                                        </div>
                                    </div>
                                </div>
                                <form class="contact-form space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                        </div>
                                        <div>
                                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                            <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                        </div>
                                    </div>
                                    <div>
                                        <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <input type="text" id="subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                    </div>
                                    <div>
                                        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea id="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                                    </div>
                                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </section>
                `;
            }

            return `
                <div class="professional-clean-portfolio w-full h-full overflow-y-auto">
                    <!-- Header -->
                    <header class="py-4 header">
                        <div class="container mx-auto px-6">
                            <div class="flex items-center justify-between">
                                <div class="text-xl font-bold text-gray-800">${fullName.split(' ')[0]}</div>
                                <nav class="hidden md:block">
                                    <ul class="flex space-x-8">
                                        <li><a href="#about" class="text-gray-600 hover:text-blue-600">About</a></li>
                                        <li><a href="#skills" class="text-gray-600 hover:text-blue-600">Skills</a></li>
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#experience" class="text-gray-600 hover:text-blue-600">Experience</a></li>` : ''}
                                        ${(selectedStructure === 'full') ? `<li><a href="#education" class="text-gray-600 hover:text-blue-600">Education</a></li>` : ''}
                                        ${(selectedStructure === 'full' || selectedStructure === 'developer') ? `<li><a href="#projects" class="text-gray-600 hover:text-blue-600">Projects</a></li>` : ''}
                                        <li><a href="#contact" class="text-gray-600 hover:text-blue-600">Contact</a></li>
                                    </ul>
                                </nav>
                                <button class="md:hidden text-gray-600">
                                    <i class="fas fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </header>

                    <!-- Hero Section -->
                    <section class="hero-section py-12 md:py-20">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row items-center">
                                <div class="md:w-1/2 mb-8 md:mb-0">
                                    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Hi, I'm ${fullName}</h1>
                                    <h2 class="text-2xl text-blue-600 mb-6">${jobTitle}</h2>
                                    <p class="text-gray-600 mb-8 max-w-lg">${bio}</p>
                                    <div class="flex space-x-4">
                                        ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-github mr-2"></i> GitHub</a>` : ''}
                                        ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"><i class="fab fa-linkedin-in mr-2"></i> LinkedIn</a>` : ''}
                                    </div>
                                </div>
                                <div class="md:w-1/2 flex justify-center">
                                    <div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-100">
                                        <img src="${profilePic}" alt="${fullName}" class="w-full h-full object-cover">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    ${sectionsHtml}

                    <!-- Footer -->
                    <footer class="py-8 footer">
                        <div class="container mx-auto px-6">
                            <div class="flex flex-col md:flex-row justify-between items-center">
                                <div class="mb-4 md:mb-0">
                                    <h3 class="text-xl font-bold text-white">${fullName}</h3>
                                    <p class="text-gray-400">${jobTitle}</p>
                                </div>
                                <div class="flex space-x-6">
                                    ${socialLinks.github && socialLinks.github !== '#' ? `<a href="${socialLinks.github}" class="text-gray-400 hover:text-white"><i class="fab fa-github text-xl"></i></a>` : ''}
                                    ${socialLinks.linkedin && socialLinks.linkedin !== '#' ? `<a href="${socialLinks.linkedin}" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin-in text-xl"></i></a>` : ''}
                                    ${socialLinks.twitter && socialLinks.twitter !== '#' ? `<a href="${socialLinks.twitter}" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-xl"></i></a>` : ''}
                                    ${socialLinks.instagram && socialLinks.instagram !== '#' ? `<a href="${socialLinks.instagram}" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-xl"></i></a>` : ''}
                                </div>
                            </div>
                            <div class="mt-8 text-center text-gray-500 text-sm">
                                <p>&copy; ${new Date().getFullYear()} ${fullName}. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            `;
        }

        // Download portfolio
        document.getElementById('download-btn').addEventListener('click', function() {
            const downloadBtn = this;
            const spinner = document.getElementById('download-spinner');

            // Show loading spinner
            downloadBtn.disabled = true;
            spinner.classList.remove('hidden');

            const data = getPortfolioData(); // Get all data for download

            // Create a ZIP file
            const zip = new JSZip();

            // Create HTML content
            let htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${data.fullName} | Portfolio</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <style>
                        body { margin: 0; padding: 0; } /* Basic reset */
                        .section-title {
                            position: relative;
                            display: inline-block;
                            margin-bottom: 2rem;
                        }
                        .section-title::after {
                            content: '';
                            position: absolute;
                            bottom: -10px;
                            left: 0;
                            width: 50px;
                            height: 3px;
                            background: #3b82f6;
                        }
                        .skill-badge {
                            background: #dbeafe;
                            color: #1d4ed8;
                            transition: all 0.3s ease;
                        }
                        .skill-badge:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        }
                        .project-card {
                            transition: all 0.3s ease;
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        }
                        .project-card:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                        }
                        .contact-form input,
                        .contact-form textarea {
                            transition: all 0.3s ease;
                            border: 1px solid #d1d5db;
                        }
                        .contact-form input:focus,
                        .contact-form textarea:focus {
                            border-color: #3b82f6;
                            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
                        }
            `;

            // Add theme-specific styles
            if (selectedTheme === 'terminal') {
                htmlContent += `
                    /* Terminal theme styles */
                    body {
                        background-color: #000;
                        color: #33ff33;
                        font-family: 'Courier New', monospace;
                        padding: 20px;
                        line-height: 1.5;
                    }
                    a {
                        color: #33ff99;
                        text-decoration: underline;
                    }
                    .header {
                        border-bottom: 1px solid #33ff33;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                        text-shadow: 0 0 5px #33ff33;
                    }
                    .command {
                        color: #ffff33;
                    }
                    .comment {
                        color: #888;
                    }
                    .skill {
                        background: #222;
                        border: 1px solid #33ff33;
                        display: inline-block;
                        padding: 5px 10px;
                        margin: 5px;
                        border-radius: 4px;
                        box-shadow: 0 0 5px rgba(51,255,51,0.5);
                    }
                    .project {
                        border: 1px solid #33ff33;
                        background: #111;
                        padding: 15px;
                        margin-bottom: 15px;
                        border-radius: 5px;
                        box-shadow: 0 0 8px rgba(51,255,51,0.6);
                    }
                    input, textarea {
                        background-color: #0d0d0d;
                        border: 1px solid #33ff33;
                        color: #33ff33;
                        box-shadow: inset 0 0 3px rgba(51,255,51,0.3);
                    }
                    button {
                        background-color: #33ff33;
                        color: #000;
                        font-weight: bold;
                        box-shadow: 0 0 10px rgba(51,255,51,0.7);
                    }
                `;
            } else if (selectedTheme === 'dark') {
                htmlContent += `
                    /* Dark theme styles */
                    body {
                        background-color: #111827;
                        color: #f3f4f6;
                    }
                    a {
                        color: #93c5fd;
                        transition: color 0.2s ease-in-out;
                    }
                    a:hover {
                        color: #60a5fa;
                    }
                    .header {
                        background-color: #1f2937;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                    }
                    .hero-section {
                        background: linear-gradient(to right, #1e3a8a, #0f172a);
                        box-shadow: inset 0 -5px 15px rgba(0,0,0,0.3);
                    }
                    .section {
                        background-color: #1f2937;
                        border-radius: 0.75rem;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                    }
                    .section-title::after {
                        background: #60a5fa;
                    }
                    .skill-badge {
                        background: #374151;
                        color: #93c5fd;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    }
                    .project-card {
                        background: #1f2937;
                        border: 1px solid #374151;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                    }
                    input, textarea {
                        background-color: #374151;
                        border-color: #4b5563;
                        color: #f3f4f6;
                    }
                    button {
                        background-color: #3b82f6;
                        color: white;
                    }
                    footer {
                        background-color: #0f172a;
                        box-shadow: inset 0 5px 15px rgba(0,0,0,0.3);
                    }
                `;
            } else if (selectedTheme === 'colorful') {
                htmlContent += `
                    /* Colorful theme styles */
                    body {
                        background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
                        color: #1e3a8a;
                    }
                    a {
                        color: #3b82f6;
                    }
                    .header {
                        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                        color: white;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    }
                    .hero-section {
                        background: linear-gradient(135deg, #c7d2fe, #a5b4fc);
                        box-shadow: inset 0 -5px 15px rgba(0,0,0,0.1);
                    }
                    .section-title::after {
                        background: #8b5cf6;
                    }
                    .skill-badge {
                        background: linear-gradient(135deg, #c7d2fe, #a5b4fc);
                        color: #4338ca;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }
                    .project-card {
                        background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
                        border: none;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    }
                    input, textarea {
                        border-color: #a5b4fc;
                        box-shadow: 0 0 0 3px rgba(165,180,252,0.3);
                    }
                    button {
                        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                        color: white;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    }
                    footer {
                        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                        color: white;
                        box-shadow: inset 0 5px 15px rgba(0,0,0,0.2);
                    }
                `;
            } else if (selectedTheme === 'retro') {
                htmlContent += `
                    /* Retro theme styles */
                    body {
                        background-color: #333;
                        color: #00ff00;
                        font-family: 'Press Start 2P', cursive;
                        padding: 20px;
                        text-shadow: 2px 2px #000;
                        border: 5px solid #00ff00;
                        box-shadow: 10px 10px 0px #000, 12px 12px 0px #ff00ff;
                    }
                    a {
                        color: #ff00ff;
                        text-decoration: underline;
                    }
                    .header {
                        border-bottom: 2px solid #00ff00;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                        text-shadow: 3px 3px #000;
                    }
                    .section-title::after {
                        background: #ff00ff;
                    }
                    .skill-badge {
                        background: #008800;
                        border: 1px solid #00ff00;
                        color: #00ff00;
                        box-shadow: 3px 3px 0px #000;
                        text-shadow: none;
                    }
                    .project-card {
                        background: #111;
                        border: 2px solid #00ff00;
                        box-shadow: 5px 5px 0px #00ff00;
                    }
                    input, textarea {
                        background-color: #000;
                        border: 1px solid #00ff00;
                        color: #00ff00;
                        box-shadow: inset 2px 2px 0px #00ff00;
                    }
                    input:focus, textarea:focus {
                        box-shadow: 0 0 0 3px rgba(0, 255, 0, 0.5), inset 2px 2px 0px #00ff00;
                    }
                    button {
                        background-color: #ff00ff;
                        color: #000;
                        font-weight: bold;
                        border: 2px solid #00ff00;
                        box-shadow: 4px 4px 0px #00ff00;
                    }
                    footer {
                        border-top: 2px dashed #00ff00;
                        background-color: #222;
                    }
                `;
            } else if (selectedTheme === 'modern-gradient') {
                htmlContent += `
                    /* Modern Gradient theme styles */
                    body {
                        background: linear-gradient(180deg, #f5f7fa, #c3cfe2);
                        color: #333;
                    }
                    header {
                        background: linear-gradient(90deg, #845EC2, #D65DB1);
                        color: white;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    }
                    .hero-section {
                        background: linear-gradient(135deg, #FF9671, #FFC72C);
                        color: white;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                    }
                    .section-title::after {
                        background: #FF6F91;
                    }
                    .skill-badge {
                        background: #FFC72C;
                        color: #845EC2;
                        font-weight: bold;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }
                    .project-card {
                        background: white;
                        border: 1px solid #e0e0e0;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    }
                    input, textarea {
                        border-color: #D65DB1;
                        box-shadow: 0 0 0 3px rgba(214,93,177,0.2);
                    }
                    button {
                        background: linear-gradient(90deg, #845EC2, #D65DB1);
                        color: white;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    }
                    footer {
                        background: linear-gradient(90deg, #845EC2, #D65DB1);
                        color: white;
                        box-shadow: inset 0 5px 15px rgba(0,0,0,0.2);
                    }
                `;
            } else if (selectedTheme === 'professional-clean') {
                htmlContent += `
                    /* Professional Clean theme styles */
                    body {
                        background-color: #f8f8f8;
                        color: #333;
                    }
                    header {
                        background-color: #ffffff;
                        border-bottom: 1px solid #eee;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    }
                    .hero-section {
                        background-color: #f0f4f8;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .section-title::after {
                        background: #007bff; /* A professional blue */
                    }
                    .skill-badge {
                        background-color: #e9f5ff;
                        color: #0056b3;
                        border: 1px solid #cce5ff;
                        font-weight: 500;
                    }
                    .project-card {
                        background-color: #ffffff;
                        border: 1px solid #e0e0e0;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    }
                    input, textarea {
                        border-color: #ced4da;
                        box-shadow: none;
                    }
                    input:focus, textarea:focus {
                        border-color: #007bff;
                        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
                    }
                    button {
                        background-color: #007bff;
                        color: white;
                        font-weight: 600;
                    }
                    footer {
                        background-color: #343a40;
                        color: #f8f9fa;
                    }
                `;
            }
            else {
                // Minimal theme (default)
                htmlContent += `
                    header {
                        background: white;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .hero-section {
                        background: linear-gradient(to right, #f0f9ff, #e0f2fe);
                    }
                `;
            }

            htmlContent += `
                    </style>
                </head>
                <body class="font-sans">
            `;

            // Add theme-specific body content
            if (selectedTheme === 'terminal') {
                htmlContent += generateTerminalTheme(data);
            } else if (selectedTheme === 'dark') {
                htmlContent += generateDarkTheme(data);
            } else if (selectedTheme === 'colorful') {
                htmlContent += generateColorfulTheme(data);
            } else if (selectedTheme === 'retro') {
                htmlContent += generateRetroTheme(data);
            } else if (selectedTheme === 'modern-gradient') {
                htmlContent += generateModernGradientTheme(data);
            } else if (selectedTheme === 'professional-clean') {
                htmlContent += generateProfessionalCleanTheme(data);
            }
            else {
                htmlContent += generateMinimalTheme(data);
            }

            htmlContent += `
                </body>
                </html>
            `;

            // Add files to ZIP
            zip.file("index.html", htmlContent);

            // Generate and download ZIP
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, "portfolio.zip");
                downloadBtn.disabled = false;
                spinner.classList.add('hidden');
            });
        });

        // Initialize progress bar
        updateProgress();

        // Generate initial preview
        generatePreview();