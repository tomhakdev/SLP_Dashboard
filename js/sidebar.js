let isSaveListenerAttached = false;

const studentData = {
    Tom: {
        id: "001",
        name: "Tom",
        dob: "2013-05-15",
        gender: "Male",
        goals: "S/Z with correct air flow (lateral air flow)",
        parentContact: "John Doe, 123-456-7890",
        specialRequests: "Needs additional practice with speech sounds at the start of words.",
        selectedSounds: ["r", "s"],
        sliderValues: {
            soundLocation: [20, 30, 50], // Initial, medial, final percentages
            syllableCount: [33, 33, 34], // One-syllable, two-syllable, three-syllable percentages
            syllableShapes: [50, 50], // VCV and CVC percentages
            syllableType: [70, 30], // Open and Closed percentages
        },
        targetWords: ["rose", "soup", "rat", "rice", "sip"], // Max 10 words
        repetitions: {
            type: "single", // Options: single, range
            value: 3, // Single value or range (if range, e.g., { from: 2, to: 4 })
        },
    },
    Simon: {
        id: "002",
        name: "Simon",
        dob: "2015-08-20",
        gender: "Male",
        goals: "K becomes T and T becomes G",
        parentContact: "Jane Smith, 987-654-3210",
        specialRequests: "Prefer visual aids during sessions.",
        selectedSounds: ["th"],
        sliderValues: {
            soundLocation: [5, 0, 95], 
            syllableCount: [30, 50, 20],
            syllableShapes: [60, 40],
            syllableType: [40, 60],
        },
        targetWords: ["cat", "kite", "gate", "bat", "sat"],
        repetitions: {
            type: "range", // Options: single, range
            value: { from: 2, to: 5 }, // Single value or range
        },
    },
    Yingel: {
        id: "003",
        name: "Yingel",
        dob: "2016-12-10",
        gender: "Female",
        goals: "weak syllable deletion",
        parentContact: "Alice Lee, 555-123-4567",
        specialRequests: "Requires extra time to complete exercises.",
        selectedSounds: ["r", "s", "th", "z", "l", "sh"],
        sliderValues: {
            soundLocation: [40, 20, 40], 
            syllableCount: [40, 40, 20],
            syllableShapes: [70, 30],
            syllableType: [50, 50],
        },
        targetWords: ["rabbit", "banana", "lamp", "sheep", "tiger", "apple"],
        repetitions: {
            type: "single", 
            value: 5,
        },
    },
};

function selectStudent(studentName) {
    const sidebarContent = document.querySelector(".sidebar-content");
    const cancelButton = document.getElementById("cancelAddStudent");
    const deleteButton = document.getElementById("deleteButton");

    resetEditIcons();

    if (studentName === "add") {
        showNewStudentInput();  

        clearStudentFields();

        sidebarContent.style.display = "block";
        cancelButton.style.display = "inline";
        deleteButton.style.display = "none";

        enableEditing("studentData");
        enableEditing("parentGuardianInfo");
        document.getElementById("studentID").setAttribute("contenteditable", "false"); 


    } else if (studentData[studentName]) {
        sidebarContent.style.display = "block";
        cancelButton.style.display = "none";
        deleteButton.style.display = "block";

        document.getElementById("studentID").textContent = studentData[studentName].id;
        document.getElementById("studentName").textContent = studentData[studentName].name;
        document.getElementById("dob").textContent = studentData[studentName].dob;
        document.getElementById("gender").textContent = studentData[studentName].gender;
        document.getElementById("goals").textContent = studentData[studentName].goals;
        document.getElementById("parentContact").textContent = studentData[studentName].parentContact;
        document.getElementById("specialRequests").textContent = studentData[studentName].specialRequests;

        disableEditing("studentData");
        disableEditing("parentGuardianInfo");
        document.getElementById("studentID").setAttribute("contenteditable", "false");  

        loadSelectedSounds(studentName);
        loadSliderValues(studentName);

    } else {
        sidebarContent.style.display = "none";
        cancelButton.style.display = "none";
        deleteButton.style.display = "none";

        clearStudentFields();
    }
}

function cancelAddStudent() {
    const sidebarContent = document.querySelector(".sidebar-content");
    const cancelButton = document.getElementById("cancelAddStudent");
    const newStudentInput = document.getElementById("newStudentInput");
    const studentDropdown = document.getElementById("studentDropdown");

    sidebarContent.style.display = "none";
    cancelButton.style.display = "none";

    if (newStudentInput) {
        newStudentInput.remove(); 
    }

    if (studentDropdown) {
        studentDropdown.style.display = "inline";
        studentDropdown.value = ""; 
    }

    clearStudentFields();
}

function showNewStudentInput() {
    const dropdown = document.getElementById("studentDropdown");
    const newStudentInput = document.createElement("input");

    newStudentInput.type = "text";
    newStudentInput.placeholder = "Enter new student name";
    newStudentInput.id = "newStudentInput";
    newStudentInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            saveNewStudent(newStudentInput.value);
        }
    });

    dropdown.style.display = "none";
    dropdown.parentNode.insertBefore(newStudentInput, dropdown);
    newStudentInput.focus();
}

function saveNewStudent(newStudentName) {
    if (!newStudentName.trim()) {
        alert("Please enter a valid name for the new student.");
        return;
    }

    const newStudentID = generateNewStudentID();

    studentData[newStudentName] = {
        id: newStudentID,
        name: newStudentName,
        dob: "",
        gender: "",
        goals: "",
        parentContact: "",
        specialRequests: ""
    };

    updateStudentDropdown(newStudentName);

    selectStudent(newStudentName);

    document.getElementById("studentID").textContent = newStudentID;

    document.getElementById("newStudentInput").remove();
    document.getElementById("studentDropdown").style.display = "inline-block";
}

function generateNewStudentID() {
    const ids = Object.values(studentData).map(student => parseInt(student.id, 10) || 0);

    const maxID = Math.max(0, ...ids);
    const newID = (maxID + 1).toString().padStart(3, "0");  

    return newID;
}


function updateStudentDropdown(newStudentName) {
    const dropdown = document.getElementById("studentDropdown");
    const addOption = dropdown.querySelector("option[value='add']");

    const newOption = document.createElement("option");
    newOption.value = newStudentName;
    newOption.textContent = newStudentName;

    dropdown.insertBefore(newOption, addOption);

    dropdown.value = newStudentName;
}


function enableEditing(section) {
    const editableFields = document.querySelectorAll(`.${section}`);
    editableFields.forEach(field => {
        if (field.id !== "studentID") { 
            field.setAttribute("contenteditable", "true");
        }
    });
}

function disableEditing(section) {
    const editableFields = document.querySelectorAll(`.${section}`);
    editableFields.forEach(field => {
        field.setAttribute("contenteditable", "false");
    });
}

function clearStudentFields() {
    document.getElementById("studentID").textContent = "";
    document.getElementById("studentName").textContent = "";
    document.getElementById("dob").textContent = "";
    document.getElementById("gender").textContent = "";
    document.getElementById("goals").textContent = "";
    document.getElementById("parentContact").textContent = "";
    document.getElementById("specialRequests").textContent = "";
}

function toggleEdit(section, enableEdit = true) {
    if (enableEdit) {
        enableEditing(section);
    } else {
        disableEditing(section);
    }
}

function toggleEdit(section) {
    const editableFields = document.querySelectorAll(`.${section}`);
    const editIcon = document.querySelector(`.editIcon[onclick="toggleEdit('${section}')"]`);

    const isEditing = editIcon.textContent === "✔️";

    editableFields.forEach(field => {
        if (field.id === "studentID") {
            field.setAttribute("contenteditable", "false");
            return;
        }

        field.setAttribute("contenteditable", !isEditing);
        
        if (!isEditing) {
            field.focus();
            field.addEventListener("blur", () => saveChanges(section));
        } else {
            saveChanges(section);
        }
    });

    editIcon.textContent = isEditing ? "✏️" : "✔️";
}


function resetEditIcons() {
    const editIcons = document.querySelectorAll(".editIcon");
    editIcons.forEach(icon => {
        if (icon.textContent === "✔️") {
            icon.textContent = "✏️";
        }
    });

    const editableFields = document.querySelectorAll(".editableField");
    editableFields.forEach(field => {
        field.setAttribute("contenteditable", "false");
    });
}



function saveChanges(section) {
    const studentName = document.getElementById("studentDropdown").value;
    if (!studentName || studentName === "add") return;

    const fieldsToSave = document.querySelectorAll(`.${section}`);
    fieldsToSave.forEach(field => {
        field.innerHTML = field.innerHTML.replace(/(<br>\s*)+$/g, '');
    });

    if (section === "studentData") {
        studentData[studentName].id = document.getElementById("studentID").textContent;
        studentData[studentName].name = document.getElementById("studentName").textContent;
        studentData[studentName].dob = document.getElementById("dob").textContent;
        studentData[studentName].gender = document.getElementById("gender").textContent;
        studentData[studentName].gender = document.getElementById("goals").textContent;
    } else if (section === "parentGuardianInfo") {
        studentData[studentName].parentContact = document.getElementById("parentContact").textContent;
        studentData[studentName].specialRequests = document.getElementById("specialRequests").textContent;
    }
}

function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    clearDropdown(dropdownId);
    options.forEach(option => {
        const optElement = document.createElement("option");
        optElement.value = option;
        optElement.textContent = option;
        dropdown.appendChild(optElement);
    });
}

function clearDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = "<option value=''>--Select--</option>";
}



function savePracticeChanges() {
    const studentNameDropdown = document.getElementById("studentDropdown");
    const studentName = studentNameDropdown ? studentNameDropdown.value : null;

    if (!studentName || studentName === "add") {
        alert("Please select a valid student to save changes.");
        return;
    }

    saveSelectedSounds(studentName);

    // Retrieve slider values
    const sliders = {
        soundLocation: getSliderValues("soundLocationSlider"),
        syllableCount: getSliderValues("syllableCountSlider"),
        syllableType: getTwoChoiceSliderValue("syllableTypeSlider"),
        syllableShapes: getTwoChoiceSliderValue("syllableShapesSlider"),
    };

    // Retrieve summaries for syllable type and syllable shapes
    const syllableTypeSummary = document.getElementById("syllableTypeSummary")?.textContent.trim();
    const syllableShapesSummary = document.getElementById("syllableShapesSummary")?.textContent.trim();

    // Retrieve other fields
    const assignedSounds = document.getElementById("assignedSounds")?.textContent.trim() || "";
    const assignedSyllables = document.getElementById("assignedSyllables")?.textContent.trim() || "";
    const assignedSoundLocation = document.getElementById("assignedSoundLocation")?.textContent.trim() || "";
    const assignedWords = document.getElementById("assignedWords")?.textContent.trim() || "";

    studentData[studentName] = {
        ...studentData[studentName],
        sliderValues: sliders,
        syllableType: syllableTypeSummary,
        syllableShapes: syllableShapesSummary,
        assignedSounds,
        assignedSyllables,
        assignedSoundLocation,
        assignedWords,
    };

    alert(`Changes saved successfully for ${studentName}.`);
    markSaveButtonInactive();
}

// Helper to get values from multi-range sliders
function getSliderValues(sliderId) {
    const slider = document.getElementById(sliderId);
    return slider?.noUiSlider ? slider.noUiSlider.get().map(Number) : null;
}

// Helper to get values from single-choice sliders
function getTwoChoiceSliderValue(sliderId) {
    const slider = document.getElementById(sliderId);
    return slider?.dataset?.value ? parseFloat(slider.dataset.value) : null;
}



function markSaveButtonActive() {
    const saveButton = document.getElementById("savePracticeButton");
    saveButton.classList.remove("inactive");
    saveButton.classList.add("active");
    saveButton.disabled = false;
}

function markSaveButtonInactive() {
    const saveButton = document.getElementById("savePracticeButton");
    saveButton.classList.remove("active");
    saveButton.classList.add("inactive");
    saveButton.disabled = true;
}

function setupChangeListeners() {
    const checkboxes = document.querySelectorAll(".select-sound input[type='checkbox']");
    const otherFields = document.querySelectorAll("#multi-range-slider, #syllableTypeSlider, #syllableShapesSlider, .sound-dropdown");
    const targetWordInput = document.getElementById("target-word-input");
    const repetitionTypeDropdown = document.getElementById("repetition-type");
    const singleRepetitionDropdown = document.getElementById("single-repetition");
    const rangeRepetitionDropdowns = document.querySelectorAll("#range-from, #range-to");

    // Add listeners for checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", markSaveButtonActive);
    });

    // Add listeners for sliders and other fields
    otherFields.forEach(field => {
        field.addEventListener("change", markSaveButtonActive);
    });

    // Add listener for target word input
    if (targetWordInput) {
        targetWordInput.addEventListener("input", markSaveButtonActive);
    }

    // Add listeners for repetition type and dropdowns
    if (repetitionTypeDropdown) {
        repetitionTypeDropdown.addEventListener("change", markSaveButtonActive);
    }

    if (singleRepetitionDropdown) {
        singleRepetitionDropdown.addEventListener("change", markSaveButtonActive);
    }

    rangeRepetitionDropdowns.forEach(dropdown => {
        dropdown.addEventListener("change", markSaveButtonActive);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    setupChangeListeners();

    const saveButton = document.getElementById("savePracticeButton");

    if (saveButton && !isSaveListenerAttached) {
        saveButton.addEventListener("click", savePracticeChanges);
        isSaveListenerAttached = true;
    }
});



function loadSelectedSounds(studentName) {
    const selectedSounds = studentData[studentName]?.selectedSounds || [];
    const checkboxes = document.querySelectorAll(".select-sound input[type='checkbox']");
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectedSounds.includes(checkbox.value);
    });
}

function saveSelectedSounds(studentName) {
    const checkboxes = document.querySelectorAll(".select-sound input[type='checkbox']");
    const selectedSounds = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    if (studentData[studentName]) {
        studentData[studentName].selectedSounds = selectedSounds;
    }
}

function loadSliderValues(studentName) {
    const student = studentData[studentName];
    if (!student || !student.sliderValues) return;

    const { soundLocation, syllableCount, syllableType, syllableShapes } = student.sliderValues;

    if (soundLocation) {
        setMultiSliderValues("soundLocationSlider", soundLocation);
        updateSliderSummary("soundLocationSummary", ["Beginning", "Middle", "End"], soundLocation);
    }

    if (syllableCount) {
        setMultiSliderValues("syllableCountSlider", syllableCount);
        updateSliderSummary("syllableCountSummary", ["1 Syllable", "2 Syllables", "3+ Syllables"], syllableCount);
    }

    if (syllableType) {
        updateTwoChoiceSummary("syllableTypeSummary", "Open", "Closed", syllableType);
    }

    if (syllableShapes) {
        updateTwoChoiceSummary("syllableShapesSummary", "VCV", "CVC", syllableShapes);
    }
}

function setMultiSliderValues(sliderId, values) {
    const slider = document.getElementById(sliderId);
    if (slider && slider.noUiSlider) {
        slider.noUiSlider.set(values);
    }
}

function setSingleSliderValue(sliderId, value) {
    const slider = document.getElementById(sliderId);
    if (slider && slider.dataset.value !== undefined) {
        slider.dataset.value = value;
        const handle = slider.querySelector(".range-handle");
        const highlight = slider.querySelector(".range-highlight");
        if (handle && highlight) {
            handle.style.left = `${value}%`;
            highlight.style.width = `${value}%`;
        }
    }
}

function updateSliderSummary(summaryId, labels, values) {
    const summary = document.getElementById(summaryId);
    summary.textContent = labels
        .map((label, index) => `${label}: ${values[index]}%`)
        .join(", ");
}

function updateTwoChoiceSummary(summaryId, label1, label2, value) {
    const summary = document.getElementById(summaryId);

    // Ensure value is a number or fallback to 0
    const numericValue = typeof value === "number" ? value : parseFloat(value[0]) || 0;

    const label1Value = numericValue.toFixed(0);
    const label2Value = (100 - numericValue).toFixed(0);
    summary.textContent = `${label1}: ${label1Value}%, ${label2}: ${label2Value}%`;
}

function setupSliderListeners() {
    const soundLocationSlider = document.getElementById("soundLocationSlider");
    const syllableCountSlider = document.getElementById("syllableCountSlider");
    const syllableTypeSlider = document.getElementById("syllableTypeSlider");
    const syllableShapesSlider = document.getElementById("syllableShapesSlider");

    // Multi-range sliders
    if (soundLocationSlider && soundLocationSlider.noUiSlider) {
        soundLocationSlider.noUiSlider.on("update", () => {
            console.log("Sound Location Slider updated");
            const values = soundLocationSlider.noUiSlider.get().map(Number);
            updateSliderSummary("soundLocationSummary", ["Beginning", "Middle", "End"], values);
            markSaveButtonActive();
        });
    }

    if (syllableCountSlider && syllableCountSlider.noUiSlider) {
        syllableCountSlider.noUiSlider.on("update", () => {
            const values = syllableCountSlider.noUiSlider.get().map(Number);
            updateSliderSummary("syllableCountSummary", ["1 Syllable", "2 Syllables", "3+ Syllables"], values);
            markSaveButtonActive();
        });
    }

    // Single-choice sliders
    if (syllableTypeSlider) {
        syllableTypeSlider.addEventListener("input", () => {
            const value = parseFloat(syllableTypeSlider.dataset.value || 0);
            updateTwoChoiceSummary("syllableTypeSummary", "Open", "Closed", value);
            markSaveButtonActive();
        });
    }

    if (syllableShapesSlider) {
        syllableShapesSlider.addEventListener("input", () => {
            const value = parseFloat(syllableShapesSlider.dataset.value || 0);
            updateTwoChoiceSummary("syllableShapesSummary", "VCV", "CVC", value);
            markSaveButtonActive();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setupSliderListeners();
});




class MultiRangeSlider {
    constructor(container, settings = {}) {
        this.container = container;
        this.settings = {
            min: settings.min || 0,
            max: settings.max || 100,
            ranges: settings.ranges || [33, 66],
            step: settings.step || 1,
            colors: settings.colors || ["#FF5733", "#33FF57", "#3357FF"], 
            summaryId: settings.summaryId || null,
        };

        this.values = [...this.settings.ranges];
        this.handles = [];
        this.highlights = [];
        this.labels = [];
        this.outsideHighlights = {};
        this.init();
    }

    init() {
        this.container.classList.add("multi-range-slider");

        this.track = document.createElement("div");
        this.track.classList.add("range-track");
        this.container.appendChild(this.track);

        this.outsideHighlights.left = document.createElement("div");
        this.outsideHighlights.left.classList.add("range-outside", "left");
        this.outsideHighlights.left.style.backgroundColor = this.settings.colors[0];
        this.container.appendChild(this.outsideHighlights.left);

        this.outsideHighlights.right = document.createElement("div");
        this.outsideHighlights.right.classList.add("range-outside", "right");
        this.outsideHighlights.right.style.backgroundColor =
            this.settings.colors[this.settings.colors.length - 1];
        this.container.appendChild(this.outsideHighlights.right);

        this.values.forEach((value, index) => {
            const handle = document.createElement("div");
            handle.classList.add("range-handle");
            handle.dataset.index = index;
            handle.style.left = `${this.valueToPercentage(value)}%`;
            handle.addEventListener("mousedown", (e) => this.startDragging(e, index));
            this.handles.push(handle);
            this.container.appendChild(handle);

            const label = document.createElement("div");
            label.classList.add("range-label");
            label.innerText = `${this.valueToPercentage(value).toFixed(0)}%`;
            label.style.left = `${this.valueToPercentage(value)}%`;
            this.labels.push(label);
            this.container.appendChild(label);

            if (index > 0) {
                const highlight = document.createElement("div");
                highlight.classList.add("range-highlight");
                highlight.style.backgroundColor = this.settings.colors[index - 1];
                this.highlights.push(highlight);
                this.container.appendChild(highlight);
            }
        });

        this.updateAll();
    }

    valueToPercentage(value) {
        const { min, max } = this.settings;
        return ((value - min) / (max - min)) * 100;
    }

    percentageToValue(percentage) {
        const { min, max } = this.settings;
        return Math.round(
            (percentage * (max - min)) / 100 / this.settings.step
        ) * this.settings.step + min;
    }

    updateAll() {
        this.values.forEach((value, index) => {
            const percentage = this.valueToPercentage(value);
            this.handles[index].style.left = `${percentage}%`;
            this.labels[index].innerText = `${percentage.toFixed(0)}%`;
            this.labels[index].style.left = `${percentage}%`;

            if (index > 0) {
                const prevPercentage = this.valueToPercentage(this.values[index - 1]);
                this.highlights[index - 1].style.left = `${prevPercentage}%`;
                this.highlights[index - 1].style.width = `${percentage - prevPercentage}%`;
            }
        });

        const leftPercentage = this.valueToPercentage(this.values[0]);
        this.outsideHighlights.left.style.width = `${leftPercentage}%`;

        const rightPercentage = this.valueToPercentage(
            this.values[this.values.length - 1]
        );
        this.outsideHighlights.right.style.left = `${rightPercentage}%`;
        this.outsideHighlights.right.style.width = `${100 - rightPercentage}%`;

        if (this.settings.summaryId) {
            const summaryElement = document.getElementById(this.settings.summaryId);
            if (summaryElement) {
                if (this.container.id === "soundLocationSlider") {
                    const beginning = this.valueToPercentage(this.values[0]).toFixed(0);
                    const middle = (
                        this.valueToPercentage(this.values[1]) -
                        this.valueToPercentage(this.values[0])
                    ).toFixed(0);
                    const end = (100 - this.valueToPercentage(this.values[1])).toFixed(0);
                    summaryElement.innerText = `Beginning: ${beginning}%, Middle: ${middle}%, End: ${end}%`;
                } else if (this.container.id === "syllableCountSlider") {
                    const oneSyllable = this.valueToPercentage(this.values[0]).toFixed(0);
                    const twoSyllables = (
                        this.valueToPercentage(this.values[1]) -
                        this.valueToPercentage(this.values[0])
                    ).toFixed(0);
                    const threePlusSyllables = (
                        100 - this.valueToPercentage(this.values[1])
                    ).toFixed(0);
                    summaryElement.innerText = `1 Syllable: ${oneSyllable}%, 2 Syllables: ${twoSyllables}%, 3+ Syllables: ${threePlusSyllables}%`;
                }
            }
        }
    }


    startDragging(event, index) {
        const onMouseMove = (e) => this.dragHandle(e, index);
        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    dragHandle(event, index) {
        const rect = this.container.getBoundingClientRect();
        const percentage = ((event.clientX - rect.left) / rect.width) * 100;
        const value = this.percentageToValue(percentage);

        if (value < this.settings.min || value > this.settings.max) return;
        if (index > 0 && value <= this.values[index - 1]) return;
        if (index < this.values.length - 1 && value >= this.values[index + 1]) return;

        this.values[index] = value;
        this.updateAll();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new MultiRangeSlider(document.getElementById("soundLocationSlider"), {
        min: 0,
        max: 100,
        ranges: [20, 70],
        step: 1,
        colors: ["#007bff", "#28a745", "#ffc107"], 
        summaryId: "soundLocationSummary",
    });

    new MultiRangeSlider(document.getElementById("syllableCountSlider"), {
        min: 0,
        max: 100,
        ranges: [33, 66],
        step: 1,
        colors: ["#FF5733", "#33FF57", "#3357FF"], 
        summaryId: "syllableCountSummary",
    });
});

console.log("Slider element:", soundLocationSlider);
console.log("noUiSlider instance:", soundLocationSlider.noUiSlider);
  
  

document.addEventListener("DOMContentLoaded", () => {
    class TwoChoiceSlider {
      constructor(container, settings = {}) {
        this.container = container;
        this.settings = {
          min: settings.min || 0,
          max: settings.max || 100,
          range: settings.range || 50, // Default 50% each
          step: settings.step || 1,
          colors: settings.colors || ["#007bff", "#ffc107"],
          summaryId: settings.summaryId || null,
          labels: settings.labels || ["Option 1", "Option 2"],
        };
  
        this.value = this.settings.range; // Single range value (0-100)
        this.handle = null;
        this.highlight = null;
        this.init();
      }
  
      init() {
        this.container.classList.add("multi-range-slider");
  
        // Range track
        this.track = document.createElement("div");
        this.track.classList.add("range-track");
        this.container.appendChild(this.track);
  
        // Highlight
        this.highlight = document.createElement("div");
        this.highlight.classList.add("range-highlight");
        this.highlight.style.backgroundColor = this.settings.colors[0];
        this.container.appendChild(this.highlight);
  
        // Handle
        this.handle = document.createElement("div");
        this.handle.classList.add("range-handle");
        this.handle.style.left = `${this.value}%`;
        this.handle.addEventListener("mousedown", (e) => this.startDragging(e));
        this.container.appendChild(this.handle);
  
        this.updateAll();
      }
  
      updateAll() {
        const percentage = this.value;
        this.handle.style.left = `${percentage}%`;
        this.highlight.style.width = `${percentage}%`;
  
        if (this.settings.summaryId) {
          const summaryElement = document.getElementById(this.settings.summaryId);
          if (summaryElement) {
            const option1 = percentage.toFixed(0);
            const option2 = (100 - percentage).toFixed(0);
            summaryElement.innerText = `${this.settings.labels[0]}: ${option1}%, ${this.settings.labels[1]}: ${option2}%`;
          }
        }
      }
  
      startDragging(event) {
        const onMouseMove = (e) => this.dragHandle(e);
        const onMouseUp = () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };
  
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }
  
      dragHandle(event) {
        const rect = this.container.getBoundingClientRect();
        const percentage = ((event.clientX - rect.left) / rect.width) * 100;
        const value = Math.min(
          Math.max(this.settings.min, percentage),
          this.settings.max
        );
  
        if (Math.abs(value - this.value) >= this.settings.step) {
          this.value = value;
          this.updateAll();
        }
      }
    }
  
    // Initialize the Open vs. Closed slider
    new TwoChoiceSlider(document.getElementById("syllableTypeSlider"), {
      min: 0,
      max: 100,
      range: 50, // Default to 50% Open, 50% Closed
      step: 1,
      colors: ["#007bff", "#ffc107"], // Blue for Open, Yellow for Closed
      summaryId: "syllableTypeSummary",
      labels: ["Open", "Closed"],
    });
  
    // Initialize the VCV vs. CVC slider
    new TwoChoiceSlider(document.getElementById("syllableShapesSlider"), {
      min: 0,
      max: 100,
      range: 50, // Default to 50% VCV, 50% CVC
      step: 1,
      colors: ["#007bff", "#ffc107"], // Blue for VCV, Yellow for CVC
      summaryId: "syllableShapesSummary",
      labels: ["Vowel-Consonant-Vowel", "Consonant-Vowel-Consonant"],
    });
  });
  



  function assignSound(value) {
    document.getElementById("assignedSounds").textContent = `Selected Sounds: ${value}`;
}

function assignSyllable(value) {
    document.getElementById("assignedSyllables").textContent = `Selected Syllables: ${value}`;
}

function assignSoundLocation(values) {
    const labels = ["Beginning", "Middle", "End"];
    const summary = values
        .map((v, i) => `${labels[i]}: ${v}%`)
        .join(", ");
    document.getElementById("assignedSoundLocation").textContent = `Selected Locations: ${summary}`;
}

function assignWord(value) {
    document.getElementById("assignedWords").textContent = `Selected Words: ${value}`;
}

function assignSyllableType(value) {
    const openPercentage = value.toFixed(0);
    const closedPercentage = (100 - value).toFixed(0);
    document.getElementById("assignedSyllableType").textContent = `Open: ${openPercentage}%, Closed: ${closedPercentage}%`;
}

function assignSyllableShape(value) {
    const vcvPercentage = value.toFixed(0);
    const cvcPercentage = (100 - value).toFixed(0);
    document.getElementById("assignedSyllableShapes").textContent = `VCV: ${vcvPercentage}%, CVC: ${cvcPercentage}%`;
}





document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("target-word-input");
    const list = document.getElementById("target-word-list");
    let targetWords = [];
  
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const word = input.value.trim();
  
        if (word && targetWords.length < 10 && !targetWords.includes(word)) {
          targetWords.push(word);
          addWordToList(word);
          input.value = "";
        } else if (targetWords.length >= 10) {
          alert("Word Limit Reached");
        }
      }
    });
  
    function addWordToList(word) {
      const li = document.createElement("li");
      li.textContent = word;
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "x";
      removeBtn.addEventListener("click", () => {
        targetWords = targetWords.filter((w) => w !== word);
        list.removeChild(li);
      });
  
      li.appendChild(removeBtn);
      list.appendChild(li);
    }
  });




  document.addEventListener("DOMContentLoaded", () => {
    const repetitionType = document.getElementById("repetition-type");
    const singleRepetition = document.getElementById("single-repetition");
    const rangeRepetition = document.getElementById("range-repetition");
    const rangeFrom = document.getElementById("range-from");
    const rangeTo = document.getElementById("range-to");
  
    // Handle Repetition Type Selection
    repetitionType.addEventListener("change", () => {
      if (repetitionType.value === "single") {
        singleRepetition.classList.remove("hidden");
        rangeRepetition.classList.add("hidden");
      } else if (repetitionType.value === "range") {
        singleRepetition.classList.add("hidden");
        rangeRepetition.classList.remove("hidden");
      }
    });
  
    // Handle Range Validation
    rangeTo.addEventListener("change", () => {
      const fromValue = parseInt(rangeFrom.value, 10);
      const toValue = parseInt(rangeTo.value, 10);
  
      if (fromValue && toValue && fromValue >= toValue) {
        alert("The 'To' value must be greater than the 'From' value.");
        rangeTo.value = ""; // Reset the "To" value
      }
    });
  });







function confirmDeleteStudent() {
    if (confirm("Are you sure you want to delete this student's data? After deletion, it can no longer be recovered.")) {
        const password = prompt("Please enter your password to confirm:");
        if (password === "1234") {
            deleteStudent();
        } else {
            alert("Incorrect password. Deletion canceled.");
        }
    }
}

function deleteStudent() {
    const studentDropdown = document.getElementById("studentDropdown");
    const selectedStudent = studentDropdown.value;

    if (selectedStudent) {
        studentDropdown.querySelector(`option[value='${selectedStudent}']`).remove();
        
        studentDropdown.value = "";

        selectStudent("");


        document.querySelector(".sidebar-content").style.display = "none";
        alert("Student data deleted successfully.");
        
    } else {
        alert("No student selected to delete.");
    }
}



const resizeHandle = document.getElementById("resizeHandle");
const sidebar = document.querySelector(".sidebar");
const dashboard = document.getElementById("dashboard");

let isResizing = false;

resizeHandle.addEventListener("mousedown", (e) => {
    isResizing = true;
    document.body.style.cursor = "ew-resize"; 
    e.preventDefault(); 
});

document.addEventListener("mousemove", (event) => {
    if (isResizing) {
        let newSidebarWidth = event.clientX;

        if (newSidebarWidth >= 300) {
            sidebar.style.width = `${newSidebarWidth}px`;
            dashboard.style.marginLeft = `${newSidebarWidth}px`;
        } else {
            sidebar.style.width = `300px`;
            dashboard.style.marginLeft = `300px`;
        }
    }
});

document.addEventListener("mouseup", () => {
    isResizing = false;
    document.body.style.cursor = "default"; 
});
