class DialogApp {
    static modalInstance = null;

    static ensureModalExists() {
        if (!document.getElementById('loading-app')) {
            const modalHtml = `
                <div class="modal fade" id="loading-app" tabindex="-1" aria-hidden="true" style="background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="background-color: rgba(0, 0, 0, 0); border-style: none">
                            <div class="loading-panel">
                                <div class="loading-content">
                                    <!-- From Uiverse.io by zebra76966 --> 
                                    <div class="loader"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            const wrapper = document.createElement('div');
            wrapper.innerHTML = modalHtml;
            document.body.appendChild(wrapper.firstElementChild);
        }
    }

    static showLoading() {
        this.ensureModalExists();

        const el = document.getElementById('loading-app');
        if (!DialogApp.modalInstance) {
            DialogApp.modalInstance = new bootstrap.Modal(el, { backdrop: 'static', keyboard: false });
        }
        DialogApp.modalInstance.show();
    }

    static hideLoading() {
        if (DialogApp.modalInstance) {
            DialogApp.modalInstance.hide();
        }
    }
}

export default DialogApp;
