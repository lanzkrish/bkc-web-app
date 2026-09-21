import os
import re
import base64
import uuid

def process_html_file(file_path, output_image_dir, public_path_prefix):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_base64(match):
        img_type = match.group(1)
        b64_data = match.group(2)
        
        # Generate a unique filename
        filename = f"asset_{uuid.uuid4().hex[:8]}.{img_type}"
        filepath = os.path.join(output_image_dir, filename)
        
        # Decode and save the image
        try:
            with open(filepath, 'wb') as img_file:
                img_file.write(base64.b64decode(b64_data))
            print(f"Extracted {filename}")
        except Exception as e:
            print(f"Failed to decode base64: {e}")
            return match.group(0) # don't replace if it fails
            
        return f'{public_path_prefix}{filename}'

    # Regex to find data:image/TYPE;base64,DATA
    # It looks for src="data:image/..." or src='data:image/...'
    # we can just match data:image/([a-zA-Z]+);base64,([^"'\s\)]+)
    pattern = r'data:image/([a-zA-Z]+);base64,([^"\'\s\)]+)'
    
    new_content = re.sub(pattern, replace_base64, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == "__main__":
    base_dir = "/Users/dhananjaysahoo/Downloads/stitch_bhubaneswar_kitchen_digital_experience"
    pages = ["homepage_bkc", "our_menu_bkc", "book_a_table_bkc", "contact_us_bkc"]
    
    app_dir = os.path.join(base_dir, "bkc-web-app")
    public_img_dir = os.path.join(app_dir, "public", "assets")
    
    os.makedirs(public_img_dir, exist_ok=True)
    
    for page in pages:
        html_file = os.path.join(base_dir, page, "code.html")
        if os.path.exists(html_file):
            print(f"Processing {html_file}")
            process_html_file(html_file, public_img_dir, "/assets/")
    print("Done extracting assets.")
