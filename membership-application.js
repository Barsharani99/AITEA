function initializeForm() {
    const steps = [
        "Credentials",
        "Goals",
        "Submission"
    ];

    const categories = {
        individual: {
            title: "Individual Member",
            icon: "👤",
            documents: "CV / Resume (optional)"
        },
        corporate: {
            title: "Corporate Member",
            icon: "🏢",
            documents: "Company Profile, Pitch Deck, or Registration Proof (required)"
        },
        institutional: {
            title: "Institutional Member",
            icon: "🏛️",
            documents: "Organization Profile or Proof of Registration (required)"
        }
    };

    const state = {
        step: 0,
        category: "individual",
        submitting: false
    };

    const form = document.getElementById("membership-form");
    const panels = Array.from(document.querySelectorAll(".step-panel"));
    const stepList = document.getElementById("step-list");
    const progressFill = document.getElementById("progress-fill");
    const credentialsFields = document.getElementById("credentials-fields");
    const interestFields = document.getElementById("interest-fields");
    const backButton = document.getElementById("back-button");
    const nextButton = document.getElementById("next-button");
    const submitButton = document.getElementById("submit-button");
    const successState = document.getElementById("success-state");
    const documentInput = document.getElementById("document");
    const uploadZone = document.getElementById("upload-zone");
    const documentLabel = document.getElementById("document-label");
    const uploadTitle = document.getElementById("upload-title");
    const statement = document.getElementById("statement");
    const wordCount = document.getElementById("word-count");

    const fieldSets = {
        individual: {
            credentials: [
                { id: "fullName", label: "Full Name", type: "text", required: true },
                { id: "email", label: "Email Address", type: "email", required: true },
                { id: "phone", label: "Phone Number", type: "phone", required: true },
                { id: "city", label: "City", type: "text", required: true },
                { id: "state", label: "State / Province", type: "text", required: true },
                { id: "country", label: "Country", type: "text", required: true }
            ],
            interests: [
                { id: "linkedin", label: "LinkedIn Profile Link", type: "url", required: true },
                {
                    id: "expertise",
                    label: "Primary Field of Expertise",
                    type: "select",
                    required: true,
                    options: ["Technology", "Education", "Commerce", "Gastronomy", "Tourism", "Sports"]
                },
                { id: "referral", label: "How did you hear about AITEA?", type: "text", required: true, full: true }
            ]
        },
        corporate: {
            credentials: [
                { id: "legalName", label: "Organization / Company Legal Name", type: "text", required: true },
                { id: "representative", label: "Authorized Representative Name", type: "text", required: true },
                { id: "designation", label: "Authorized Representative Role", type: "text", required: true },
                { id: "registration", label: "Company Registration Number (e.g. FN or CIN)", type: "text", required: true },
                { id: "website", label: "Official Website URL", type: "url", required: true }
            ],
            interests: [
                { id: "companySize", label: "Company Size", type: "select", required: true, options: ["1-10", "11-50", "51-250", "250+ employees"] },
                {
                    id: "marketExpansion",
                    label: "Target Market Expansion",
                    type: "radio-chips",
                    required: true,
                    options: ["Austria to India", "India to Austria", "General Bilateral Exchange"]
                },
                {
                    id: "interests",
                    label: "Matchmaking & Strategic Interests",
                    type: "checkboxes",
                    required: true,
                    full: true,
                    options: ["Joint Ventures", "Academic Research Partnerships", "Legal Guidance"]
                }
            ]
        },
        institutional: {
            credentials: [
                { id: "legalName", label: "Institution / Organization Legal Name", type: "text", required: true },
                { id: "representative", label: "Authorized Representative Name", type: "text", required: true },
                { id: "designation", label: "Authorized Representative Role", type: "text", required: true },
                { id: "registration", label: "Registration / MoU Reference Number", type: "text", required: true },
                { id: "website", label: "Official Website URL", type: "url", required: true }
            ],
            interests: [
                {
                    id: "institutionType",
                    label: "Institution Type",
                    type: "select",
                    required: true,
                    options: ["Public University", "Private Academy", "Sports Federation", "Cultural Body"]
                },
                {
                    id: "partnershipAreas",
                    label: "Target Partnership Areas",
                    type: "checkboxes",
                    required: true,
                    full: true,
                    options: ["Dual-Degree Programs", "Sports Diplomacy Exchanges", "Student Mobility"]
                }
            ]
        }
    };

    function renderProgress() {
        if (!stepList) return;
        stepList.innerHTML = steps.map((label, index) => {
            const status = index === state.step ? "active" : index < state.step ? "complete" : "";
            return `
                <li class="progress-step ${status}">
                    <span class="progress-dot">${index + 1}</span>
                    <span>${label}</span>
                </li>
            `;
        }).join("");
        if (progressFill) {
            progressFill.style.width = `${(state.step / (steps.length - 1)) * 100}%`;
        }
    }

    function renderDynamicFields() {
        if (!state.category) {
            credentialsFields.innerHTML = "";
            interestFields.innerHTML = "";
            return;
        }

        credentialsFields.innerHTML = fieldSets[state.category].credentials.map(renderField).join("");
        interestFields.innerHTML = fieldSets[state.category].interests.map(renderField).join("");
        syncSelectLabels();
        attachRealtimeValidation();
    }

    function renderField(field) {
        if (field.type === "phone") {
            return `
                <div class="phone-field full" data-group="${field.id}">
                    <label class="floating-field">
                        <select id="countryCode" name="countryCode" class="has-value">
                            <option value="+43">🇦🇹 +43</option>
                            <option value="+91" selected>🇮🇳 +91</option>
                            <option value="+49">🇩🇪 +49</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+1">🇺🇸 +1</option>
                        </select>
                        <span>Code</span>
                        <strong class="field-error"></strong>
                    </label>
                    <label class="floating-field">
                        <input id="${field.id}" name="${field.id}" type="tel" placeholder=" " data-required="true" maxlength="10">
                        <span>${field.label}</span>
                        <strong class="field-error"></strong>
                    </label>
                </div>
            `;
        }

        if (field.type === "select") {
            return `
                <label class="floating-field ${field.full ? "full" : ""}">
                    <select id="${field.id}" name="${field.id}" data-required="${field.required ? "true" : "false"}">
                        <option value=""></option>
                        ${field.options.map(option => `<option value="${option}">${option}</option>`).join("")}
                    </select>
                    <span>${field.label}</span>
                    <strong class="field-error"></strong>
                </label>
            `;
        }

        if (field.type === "radio-chips") {
            return `
                <div class="full" data-radio-group="${field.id}" data-required="${field.required ? "true" : "false"}">
                    <span style="display:block; font-size:12px; font-weight:700; color:var(--muted); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;">${field.label}</span>
                    <div class="radio-chips-group">
                        ${field.options.map(option => `
                            <label class="choice-chip">
                                <input type="radio" name="${field.id}" value="${option}">
                                <span>${option}</span>
                            </label>
                        `).join("")}
                    </div>
                    <strong class="field-error"></strong>
                </div>
            `;
        }

        if (field.type === "checkboxes") {
            return `
                <div class="full" data-checkbox-group="${field.id}" data-required="${field.required ? "true" : "false"}">
                    <span style="display:block; font-size:12px; font-weight:700; color:var(--muted); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;">${field.label}</span>
                    <div class="checkbox-group">
                        ${field.options.map(option => `
                            <label class="choice-chip">
                                <input type="checkbox" name="${field.id}" value="${option}">
                                <span>${option}</span>
                            </label>
                        `).join("")}
                    </div>
                    <strong class="field-error"></strong>
                </div>
            `;
        }

        return `
            <label class="floating-field ${field.full ? "full" : ""}">
                <input id="${field.id}" name="${field.id}" type="${field.type}" placeholder=" " data-required="${field.required ? "true" : "false"}">
                <span>${field.label}</span>
                <strong class="field-error"></strong>
            </label>
        `;
    }

    function syncSelectLabels() {
        document.querySelectorAll("select").forEach(select => {
            select.classList.toggle("has-value", Boolean(select.value));
            select.addEventListener("change", () => {
                select.classList.toggle("has-value", Boolean(select.value));
            });
        });
    }

    function attachRealtimeValidation() {
        form.querySelectorAll("input, select, textarea").forEach(input => {
            if (input.type === "tel") {
                input.addEventListener("input", () => {
                    input.value = input.value.replace(/\D/g, "").substring(0, 10);
                });
                input.addEventListener("keypress", (e) => {
                    if (!/[0-9]/.test(e.key) || input.value.length >= 10) {
                        e.preventDefault();
                    }
                });
            }

            input.addEventListener("input", () => validateInput(input));
            input.addEventListener("blur", () => validateInput(input));
            input.addEventListener("change", () => {
                validateInput(input);
                
                const cbGroup = input.closest("[data-checkbox-group]");
                if (cbGroup) validateCheckboxGroup(cbGroup);

                const radGroup = input.closest("[data-radio-group]");
                if (radGroup) validateRadioGroup(radGroup);
            });
        });
    }

    function setStep(nextStep) {
        state.step = Math.max(0, Math.min(steps.length - 1, nextStep));
        panels.forEach((panel, index) => panel.classList.toggle("active", index === state.step));
        backButton.disabled = state.step === 0;
        nextButton.style.display = state.step === steps.length - 1 ? "none" : "inline-flex";
        submitButton.style.display = state.step === steps.length - 1 ? "inline-flex" : "none";
        renderProgress();
    }

    function setError(errorEl, message) {
        if (!errorEl) return;
        errorEl.textContent = message;
        errorEl.classList.toggle("show", Boolean(message));
    }

    function validateEmail(value) {
        if (!value) return "Email address is required.";
        const emailRegex = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
        const match = value.match(emailRegex);
        if (!match) return "Enter a valid email address.";
        
        const domain = match[1];
        const parts = domain.split('.');
        const tld = parts[parts.length - 1].toLowerCase();
        
        if (tld.length < 2) {
            return "Invalid email domain extension.";
        }
        
        const commonTypos = {
            'gmail.con': 'gmail.com',
            'gmail.co': 'gmail.com',
            'yahoo.con': 'yahoo.com',
            'hotmail.con': 'hotmail.com'
        };
        if (commonTypos[domain]) {
            return `Did you mean ${commonTypos[domain]}?`;
        }
        
        return "";
    }

    function validateRealName(value) {
        if (!value) return "Full Name is required.";
        const trimmed = value.trim();
        const words = trimmed.split(/\s+/);
        if (words.length < 2) {
            return "Please enter both your first and last name.";
        }
        // Cross-browser safe check: reject digits and key special characters
        const invalidCharRegex = /[0-9!@#$%^&*()_=+\[\]{};:"\\|<>\/?~`]/;
        if (invalidCharRegex.test(trimmed)) {
            return "Name contains invalid characters. Use letters only.";
        }
        return "";
    }

    function validateLocation(value, fieldLabel) {
        if (!value) return `${fieldLabel} is required.`;
        const trimmed = value.trim();
        if (trimmed.length < 2) {
            return `${fieldLabel} must be at least 2 characters.`;
        }
        // Cross-browser safe check: reject digits and key special characters
        const invalidCharRegex = /[0-9!@#$%^&*()_=+\[\]{};:"\\|<>\/?~`]/;
        if (invalidCharRegex.test(trimmed)) {
            return `${fieldLabel} contains invalid characters.`;
        }
        return "";
    }

    function validateInput(input) {
        if (!input || input.type === "file" || input.type === "checkbox" || input.type === "radio") return true;
        const errorEl = input.parentElement.querySelector(".field-error");
        const required = input.dataset.required === "true" || input.hasAttribute("required");
        const value = input.value.trim();
        let message = "";

        if (required && !value) {
            message = "This field is required.";
        } else if (input.id === "fullName") {
            message = validateRealName(value);
        } else if (input.id === "city") {
            message = validateLocation(value, "City");
        } else if (input.id === "state") {
            message = validateLocation(value, "State");
        } else if (input.id === "country") {
            message = validateLocation(value, "Country");
        } else if (input.type === "email") {
            message = validateEmail(value);
        } else if (input.type === "url" && value && !/^https?:\/\/.+\..+/i.test(value)) {
            message = "Enter a complete URL starting with http:// or https://.";
        } else if (input.type === "tel" && value && !/^\d{10}$/.test(value)) {
            message = "Enter a valid 10-digit phone number.";
        }

        setError(errorEl, message);
        return !message;
    }

    function validateCheckboxGroup(group) {
        const checked = group.querySelectorAll("input:checked").length;
        const errorEl = group.querySelector(".field-error");
        const message = group.dataset.required === "true" && !checked ? "Choose at least one option." : "";
        setError(errorEl, message);
        return !message;
    }

    function validateRadioGroup(group) {
        const checked = group.querySelectorAll("input:checked").length;
        const errorEl = group.querySelector(".field-error");
        const message = group.dataset.required === "true" && !checked ? "Please select one of the options." : "";
        setError(errorEl, message);
        return !message;
    }

    function validateStep() {
        const panel = panels[state.step];
        let valid = true;

        if (state.step === 0) {
            panel.querySelectorAll("input, select").forEach(input => {
                if (!validateInput(input)) valid = false;
            });
        } else if (state.step === 1) {
            panel.querySelectorAll("input, select").forEach(input => {
                if (!validateInput(input)) valid = false;
            });
            panel.querySelectorAll("[data-checkbox-group]").forEach(group => {
                if (!validateCheckboxGroup(group)) valid = false;
            });
            panel.querySelectorAll("[data-radio-group]").forEach(group => {
                if (!validateRadioGroup(group)) valid = false;
            });
        } else if (state.step === 2) {
            if (!validateStatement()) valid = false;
            if (!validateDocument()) valid = false;
            if (!validateConsent("gdpr")) valid = false;
            if (!validateConsent("conduct")) valid = false;
        }

        return valid;
    }

    function validateStatement() {
        const words = countWords(statement.value);
        let message = "";
        if (!statement.value.trim()) {
            message = "Add a short statement of interest.";
        } else if (words > 300) {
            message = "Keep your statement within 300 words.";
        }
        setError(statement.parentElement.querySelector(".field-error"), message);
        return !message;
    }

    function validateDocument() {
        const file = documentInput.files[0];
        let message = "";
        if (state.category !== "individual" && !file) {
            message = "Upload a PDF supporting document.";
        } else if (file) {
            if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
                message = "Only PDF files are accepted.";
            } else if (file.size > 5 * 1024 * 1024) {
                message = "PDF must be 5MB or smaller.";
            }
        }
        setError(document.getElementById("document-error"), message);
        return !message;
    }

    function validateConsent(id) {
        const input = document.getElementById(id);
        const error = document.getElementById(`${id}-error`);
        const message = input.checked ? "" : "This agreement is required.";
        setError(error, message);
        return !message;
    }

    function countWords(value) {
        return value.trim().split(/\s+/).filter(Boolean).length;
    }

    function updateWordCount() {
        const words = countWords(statement.value);
        wordCount.textContent = `${words} / 300 words`;
        wordCount.style.color = words > 300 ? "var(--danger)" : "var(--muted)";
    }

    function updateDocumentHelp() {
        if (!state.category) return;
        const docs = categories[state.category].documents;
        documentLabel.textContent = `Required Document: ${docs}`;
        document.getElementById("upload-help").textContent = `Maximum 5MB. (${docs})`;
    }

    function selectCategoryCard(category) {
        if (!categories[category]) return;
        state.category = category;
        
        renderDynamicFields();
        updateDocumentHelp();
    }

    nextButton.addEventListener("click", () => {
        if (validateStep()) setStep(state.step + 1);
    });

    backButton.addEventListener("click", () => setStep(state.step - 1));

    statement.addEventListener("input", () => {
        updateWordCount();
        validateStatement();
    });

    documentInput.addEventListener("change", () => {
        const file = documentInput.files[0];
        uploadTitle.textContent = file ? file.name : "Drag and drop your PDF here";
        validateDocument();
    });

    ["dragenter", "dragover"].forEach(eventName => {
        uploadZone.addEventListener(eventName, event => {
            event.preventDefault();
            uploadZone.classList.add("dragging");
        });
    });

    ["dragleave", "drop"].forEach(eventName => {
        uploadZone.addEventListener(eventName, event => {
            event.preventDefault();
            uploadZone.classList.remove("dragging");
        });
    });

    uploadZone.addEventListener("drop", event => {
        const file = event.dataTransfer.files[0];
        if (!file) return;
        const transfer = new DataTransfer();
        transfer.items.add(file);
        documentInput.files = transfer.files;
        uploadTitle.textContent = file.name;
        validateDocument();
    });

    ["gdpr", "conduct"].forEach(id => {
        document.getElementById(id).addEventListener("change", () => validateConsent(id));
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!validateStep() || state.submitting) return;

        state.submitting = true;
        submitButton.classList.add("submitting");
        submitButton.disabled = true;

        window.setTimeout(() => {
            form.style.display = "none";
            document.querySelector(".progress-nav").style.display = "none";
            successState.classList.add("show");
            state.submitting = false;
        }, 1200);
    });

    // Read initial step and category parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    let categoryToSelect = "individual";
    if (catParam && categories[catParam]) {
        categoryToSelect = catParam;
    }

    renderProgress();
    selectCategoryCard(categoryToSelect);
    updateDocumentHelp();
    updateWordCount();
    setStep(0);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeForm);
} else {
    initializeForm();
}
