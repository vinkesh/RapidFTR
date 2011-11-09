require 'spec_helper'

describe ChildrenHelper do

  #Delete this example and add some real ones or delete this file
  it "is included in the helper object" do
    included_modules = (class << helper; self; end).send :included_modules
    included_modules.should include(ChildrenHelper)
  end

  describe "#link_to_update_info" do
    it "should not show link if child has not been updated" do
      child = Child.new(:age => "27", :unique_identifier => "georgelon12345", :_id => "id12345", :created_by => 'jsmith')
      child.stub!(:has_one_interviewer?).and_return(true)
      helper.link_to_update_info(child).should be_nil
    end
    
    it "should show link if child has been updated by multiple people" do
      child = Child.new(:age => "27", :unique_identifier => "georgelon12345", :_id => "id12345", :created_by => 'jsmith')
      child.stub!(:has_one_interviewer?).and_return(false)
      helper.link_to_update_info(child).should have_tag('a', :text => 'and others')
    end
  end
	describe "field_for_display" do
		it "should return the string value where set" do
			helper.field_value_for_display("Foo").should == "Foo"
		end
		it "should return nbsp string if field is nil or 0 length" do
			helper.field_value_for_display("").should == "&nbsp;"
			helper.field_value_for_display(nil).should == "&nbsp;"
			helper.field_value_for_display([]).should == "&nbsp;"
		end
		it "should comma separate values if field value is an array" do
			helper.field_value_for_display(["A", "B", "C"]).should == "A, B, C"
		end
  end

  describe "is audio playable in browser" do
    it "should return true if atleast one of the audio files are playable in browser" do
      current_time = Time.parse("Feb 20 2010 12:04:32")
      Time.stub!(:now).and_return current_time
      child = Child.create('audio' => multiple_audio_upload)
      child['audio_attachments'].size.should == 2
      child['audio_attachments'].collect do |audio_attachment|
        child.should_receive(:read_attachment).with(audio_attachment['original']).and_return("Some audio")
      end
      helper.is_playable_in_browser(child.audio).should be_true
    end

    it "should return false if none of the audio files are playable in browser" do
      current_time = Time.parse("Feb 20 2010 12:04:32")
      Time.stub!(:now).and_return current_time
      child = Child.create('audio' => uploadable_audio_ogg)
      child.should_not_receive(:read_attachment)
      helper.is_playable_in_browser(child.audio).should be_false
    end
  end
end
